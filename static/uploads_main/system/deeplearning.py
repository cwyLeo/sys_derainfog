import torch
import torch.nn as nn
from torch.utils.data.dataset import Dataset
from PIL import Image
import torchvision
from torchvision import transforms
import torch.utils.data as data
#import torchsnooper
import cv2
import numpy as np
from utils import *
import matplotlib.pyplot as plt

basedir = os.path.abspath(os.path.dirname(__file__))
model_path = os.path.join(basedir,'weights')
defog_net = DehazeNet_2()
defog_net.load_state_dict(torch.load(os.path.join(model_path,'defog4_noaug.pth'),weights_only=True, map_location='cpu'))
dark_channel_piror = DarkChannelPrior(kernel_size=15, top_candidates_ratio=0.0001,omega=0.95,radius=40,eps=1e-3,open_threshold=True,depth_est=True)
dehaze_net = AOD_net()
dehaze_net.load_state_dict(torch.load(os.path.join(model_path,'dehazer.pth',),weights_only=True,map_location=torch.device('cpu')))

# def defog_image(image,a):
# 	img = Image.fromarray(cv2.cvtColor(image,cv2.COLOR_BGR2RGB))
# 	img1 = loader(img)
# 	img2 = transforms.ToTensor()(img)
# 	c, h, w = img1.shape
# 	patch_size = 16
# 	num_w = int(w / patch_size)
# 	num_h = int(h / patch_size)
# 	t_list = []
# 	for i in range(0, num_w):
# 		for j in range(0, num_h):
# 			patch = img1[:, 0 + j * patch_size:patch_size + j * patch_size,
# 				0 + i * patch_size:patch_size + i * patch_size]
# 			patch = torch.unsqueeze(patch, dim=0)
# 			t = defog_net(patch)
# 			t_list.append([i,j,t])
	
# 	t_list = sorted(t_list, key=lambda t_list:t_list[2])
# 	a_list = t_list[:len(t_list)//100]
# 	a0 = 0
# 	for k in range(0,len(a_list)):
# 		patch = img2[:, 0 + a_list[k][1] * patch_size:patch_size + a_list[k][1] * patch_size,
# 				0 + a_list[k][0] * patch_size:patch_size + a_list[k][0] * patch_size]
# 		a = torch.max(patch)
# 		if a0 < a.item():
# 			a0 = a.item()
# 	for k in range(0,len(t_list)):
# 		img2[:, 0 + t_list[k][1] * patch_size:patch_size + t_list[k][1] * patch_size,
# 			0 + t_list[k][0] * patch_size:patch_size + t_list[k][0] * patch_size] = (img2[:,
# 			0 + t_list[k][1] * patch_size:patch_size + t_list[k][1] * patch_size,
# 			0 + t_list[k][0] * patch_size:patch_size + t_list[k][0] * patch_size] - a0*(1-t_list[k][2]))/t_list[k][2]
# 	defog_img = transforms.ToPILImage()(img2)
# 	defog_img = cv2.cvtColor(np.asarray(defog_img),cv2.COLOR_RGB2BGR)
# 	return defog_img,sum(np.prod(p.size()) for p in defog_net.parameters())

def dehaze_image(image,a):
    cudnn.benchmark = True
    #读取模型
    model = load_model(os.path.join(model_path,'best_outdoor.pth'))
    #读取模型之后，进行前向传播
    #===== Load input image =====
    transform = transforms.Compose([
        transforms.ToTensor(), 
        transforms.Normalize(mean = (0.5, 0.5, 0.5), std = (0.5, 0.5, 0.5))
        ]
    )
    model.eval()
    # image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    src = np.array(image)
    #对三通道图像进行填充
    npad = ((7,8), (7,8), (0,0))
    im = np.pad(src, npad, 'symmetric')
    #转化为tensor
    imgIn = transform(im).unsqueeze_(0)
    #===== Test procedures =====
    varIn = Variable(imgIn)
    with torch.no_grad():
       output = model(varIn)
    te = output.data.cpu().numpy().squeeze()
    src = image
    t = TransmissionRefine(src,te)
    #t = te
    I = src/255.0
    dark = DarkChannel(I,15)
    A = AtmLight(I,dark)
    #对te精细化，得到t
    J = Recover(I,t,A,0.1) * 255
    return J.astype(np.uint8),sum(np.prod(p.size()) for p in model.parameters())

def DCP_image(image,a):
    image = np.array(Image.fromarray(cv2.cvtColor(image,cv2.COLOR_BGR2RGB)))
    image = np.asarray(image,dtype=np.float64)
    
    image_data_tensor = image_numpy_to_tensor(image)
    
    # image_data_tensor = torch.cat((image_data_tensor,image_data_tensor),dim=0)
    
    dehaze_images, dc,airlight,raw_t,refined_transmission,depth= dark_channel_piror(image_data_tensor)
    dehaze_images = dehaze_images.squeeze(0).permute(1,2,0).cpu().numpy().astype(np.uint8)
    dehaze_images = cv2.cvtColor(np.asarray(dehaze_images),cv2.COLOR_RGB2BGR)
    return dehaze_images,sum(np.prod(p.size()) for p in dark_channel_piror.parameters())

def AOD_image(image,a):

	image = np.array(Image.fromarray(cv2.cvtColor(image,cv2.COLOR_BGR2RGB)))
	data_hazy = (np.asarray(image)/255.0)

	data_hazy = torch.from_numpy(data_hazy).float()
	data_hazy = data_hazy.permute(2,0,1)
	data_hazy = data_hazy.unsqueeze(0)

	clean_image = dehaze_net(data_hazy).cpu().detach().squeeze(0).permute(1,2,0).cpu().numpy()
	clean_image = cv2.cvtColor(clean_image,cv2.COLOR_RGB2BGR)
	total_params = sum(np.prod(p.size()) for p in dehaze_net.parameters())
	return (clean_image * 255).astype(np.uint8),total_params