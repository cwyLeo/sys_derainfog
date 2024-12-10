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
from testdata_process.misc import *
from testdata_process.image_dataset import TestDataset
from torch.utils.data import DataLoader

basedir = os.path.abspath(os.path.dirname(__file__))
model_path = os.path.join(basedir,'weights')


def dehaze_image(images,a):
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
    results = []
    model_para = 0
    for image in images:
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
        if model_para == 0:
            model_para = sum(np.prod(p.size()) for p in model.parameters())
        te = output.data.cpu().numpy().squeeze()
        src = image
        t = TransmissionRefine(src,te)
        #t = te
        I = src/255.0
        dark = DarkChannel(I,15)
        A = AtmLight(I,dark)
        #对te精细化，得到t
        J = Recover(I,t,A,0.1) * 255
        results.append(J.astype(np.uint8))
    del model
    torch.cuda.empty_cache()
    return results,model_para


def AOD_image(images,a):
    dehaze_net = AOD_net()
    isGPU = torch.cuda.is_available()
    if torch.cuda.is_available():
        dehaze_net.load_state_dict(torch.load(os.path.join(model_path,'dehazer.pth',),weights_only=True))
        dehaze_net.cuda()
    else:
        dehaze_net.load_state_dict(torch.load(os.path.join(model_path,'dehazer.pth',),weights_only=True,map_location=torch.device('cpu')))
    results = []
    total_params = 0
    for image in images:
        with torch.no_grad():
            # if isGPU:
            image = np.array(Image.fromarray(cv2.cvtColor(image,cv2.COLOR_BGR2RGB)))
            data_hazy = (np.asarray(image)/255.0).astype(np.float16)

            data_hazy = torch.from_numpy(data_hazy).float()
            data_hazy = data_hazy.permute(2,0,1)
            if isGPU:
                data_hazy = data_hazy.unsqueeze(0).cuda()
            else:
                data_hazy = data_hazy.unsqueeze(0)

            clean_image = dehaze_net(data_hazy).cpu().detach().squeeze(0).permute(1,2,0).cpu().numpy()
            clean_image = cv2.cvtColor(clean_image,cv2.COLOR_RGB2BGR)
            if total_params == 0:
                total_params = sum(np.prod(p.size()) for p in dehaze_net.parameters())
            results.append((clean_image * 255).astype(np.uint8))
    del dehaze_net
    torch.cuda.empty_cache()
    return results,total_params

def TOENET_image(images,a):
    if torch.cuda.is_available():
        isGPU = 1
    else:
        isGPU = 0
    model,optimizer,cur_epoch = load_checkpoint(model_path,isGPU)
    model.eval()
    total_params = 0
    results = []
    for image in images:
        with torch.no_grad():
            img_c = image / 255.0
            img_l = hwc_to_chw(np.array(img_c).astype('float32'))
            if isGPU == 1:
                input_var = torch.from_numpy(img_l.copy()).type(torch.FloatTensor).unsqueeze(0).cuda()
            else:
                input_var = torch.from_numpy(img_l.copy()).type(torch.FloatTensor).unsqueeze(0)
            E_out = model(input_var).to('cpu')  
            E_out = chw_to_hwc(E_out.squeeze().cpu().detach().numpy())
            results.append(np.clip(E_out*255,0.0,255.0).astype(np.uint8))               
            # cv2.imwrite(result_dir + '/' + testfiles[f][:-4] + '_TOENet.png',np.clip(E_out*255,0.0,255.0)
            if total_params == 0:
                total_params = sum(np.prod(p.size()) for p in model.parameters())
    del model
    torch.cuda.empty_cache()
    return results,total_params

def DMPHN_image(images,a):
    encoder_lv1,encoder_lv2,encoder_lv3,decoder_lv1,decoder_lv2,decoder_lv3,total_params = load_gan()
    results = []
    for images_name in a:
        with torch.no_grad():             
            # img_c = images_name / 255.0
            # img_l = hwc_to_chw(np.array(img_c).astype('float32'))
            # images_lv1 = torch.from_numpy(img_l.copy()).type(torch.FloatTensor)
            images_lv1 = transforms.ToTensor()(Image.open(images_name).convert('RGB'))
            original_size = images_lv1.size()[1:]  # 保存原始尺寸
            if torch.cuda.is_available():
                images_lv1 = Variable(images_lv1 - 0.5).unsqueeze(0).cuda()
            else:
                images_lv1 = Variable(images_lv1 - 0.5).unsqueeze(0)
            # images_lv1 = Variable(images_lv1 - 0.5).unsqueeze(0)

            H = (images_lv1.size(2) + 7) // 8 * 8
            W = (images_lv1.size(3) + 7) // 8 * 8
            # 进行零填充
            images_lv1 = pad_to_size(images_lv1, (H, W))

            images_lv1 = images_lv1[:,:,:H,:W]
            images_lv2_1 = images_lv1[:,:,0:int(H/2),:W]
            images_lv2_2 = images_lv1[:,:,int(H/2):H,:W]
            images_lv3_1 = images_lv2_1[:,:,:,0:int(W/2)]
            images_lv3_2 = images_lv2_1[:,:,:,int(W/2):W]
            images_lv3_3 = images_lv2_2[:,:,:,0:int(W/2)]
            images_lv3_4 = images_lv2_2[:,:,:,int(W/2):W]

            feature_lv3_1 = encoder_lv3(images_lv3_1)
            feature_lv3_2 = encoder_lv3(images_lv3_2)
            feature_lv3_3 = encoder_lv3(images_lv3_3)
            feature_lv3_4 = encoder_lv3(images_lv3_4)
            feature_lv3_top = torch.cat((feature_lv3_1, feature_lv3_2), 3)
            feature_lv3_bot = torch.cat((feature_lv3_3, feature_lv3_4), 3)
            feature_lv3 = torch.cat((feature_lv3_top, feature_lv3_bot), 2)
            residual_lv3_top = decoder_lv3(feature_lv3_top)
            residual_lv3_bot = decoder_lv3(feature_lv3_bot)

            feature_lv2_1 = encoder_lv2(images_lv2_1 + residual_lv3_top)
            feature_lv2_2 = encoder_lv2(images_lv2_2 + residual_lv3_bot)
            feature_lv2 = torch.cat((feature_lv2_1, feature_lv2_2), 2) + feature_lv3
            residual_lv2 = decoder_lv2(feature_lv2)

            feature_lv1 = encoder_lv1(images_lv1 + residual_lv2) + feature_lv2
            dehazed_image = decoder_lv1(feature_lv1)
            dehazed_image = crop_to_original_size(dehazed_image, original_size)
            # E_out = chw_to_hwc(dehazed_image.squeeze().cpu().detach().numpy())
            # results.append(np.clip(E_out*255,0.0,255.0).astype(np.uint8))   
            results.append(dehazed_image.data+0.5)
    return results,total_params

def SDA_image(images,a):
    # get dataloader
    tmp_a = a
    results = []
    if isinstance(a,str) and ('jpg' in a or 'png' in a):
        a = os.path.dirname(a)
    if isinstance(a,str):
        test_dataset = TestDataset(a)
        Dataloader_test = DataLoader(dataset=test_dataset, batch_size=1, shuffle=True)
        a_type = 1
    else:
        a_type = 0

    device = 'cpu'
    # --- Gpu device --- #
    device_ids = [Id for Id in range(torch.cuda.device_count())]
    print(device_ids)
    if torch.cuda.is_available():
        print( torch.cuda.is_available())
        device = torch.device('cuda')



    # --- Define the network --- #


    encoder = Semi_Encoder()
    encoder_state_dict = torch.load(os.path.join(model_path,'For_real/encoder_epoch_real.pth'),map_location=device)
    from collections import OrderedDict
    new_state_dict = OrderedDict()
    for k, v in encoder_state_dict.items():
        name = k[7:] # remove `module.`
        new_state_dict[name] = v
    # load params
    encoder.load_state_dict(new_state_dict)
    encoder = nn.DataParallel(encoder).to(device)

    decoder = Semi_Decoder()
    decoder_state_dict = torch.load(os.path.join(model_path,'For_real/decoder_epoch_real.pth'),map_location=device)
    total_params = sum(p.numel() for p in encoder.parameters()) + sum(p.numel() for p in decoder.parameters())
    from collections import OrderedDict
    new_state_dict = OrderedDict()
    for k, v in decoder_state_dict.items():
        name = k[7:] # remove `module.`
        new_state_dict[name] = v
    # load params
    decoder.load_state_dict(new_state_dict)
    decoder = nn.DataParallel(decoder).to(device)

    encoder.train()
    decoder.train()

    with torch.no_grad():
        if a_type == 1:
            for i, data in enumerate(Dataloader_test, 0):
                test_haze, name = data
                print(name[0],tmp_a[:-4])
                if ('jpg' in tmp_a or 'png' in tmp_a) and name[0] != tmp_a[:-4]:
                    continue
                test_haze = test_haze.to(device)
                haze_latent = encoder(test_haze)
                dehazed = decoder(haze_latent)            
                dehazed1 = dehazed.squeeze(0)
                results.append(dehazed1)
        else:
            for image_name in a:
                trans = transforms.Compose([transforms.ToTensor()])
                test_haze = trans(Image.open(image_name))
                test_haze = test_haze.to(device)
                haze_latent = encoder(test_haze)
                dehazed = decoder(haze_latent)            
                dehazed1 = dehazed.squeeze(0)
                results.append(dehazed1)
    return results,total_params