from __future__ import absolute_import
from __future__ import division
from __future__ import print_function
import torch
import torch.nn as nn
from torch.autograd import Variable
import torchvision
from torchvision import transforms
from GuideFilter.guided_filter import GuidedFilter2d,FastGuidedFilter2d

import torch
import torch.nn as nn
import torch.nn.functional as F

import torch
import torch.nn as nn
from torch.autograd import Variable
import functools
import torch.nn.functional as F
import numpy as np
from skimage import color
from skimage.morphology import disk
import skimage.filters.rank as sfr

def _diff_x(src, r):
    cum_src = src.cumsum(-2)

    left = cum_src[..., r:2*r + 1, :]
    middle = cum_src[..., 2*r + 1:, :] - cum_src[..., :-2*r - 1, :]
    right = cum_src[..., -1:, :] - cum_src[..., -2*r - 1:-r - 1, :]

    output = torch.cat([left, middle, right], -2)

    return output

def _diff_y(src, r):
    cum_src = src.cumsum(-1)

    left = cum_src[..., r:2*r + 1]
    middle = cum_src[..., 2*r + 1:] - cum_src[..., :-2*r - 1]
    right = cum_src[..., -1:] - cum_src[..., -2*r - 1:-r - 1]

    output = torch.cat([left, middle, right], -1)

    return output

def boxfilter2d(src, radius):
    return _diff_y(_diff_x(src, radius), radius)

class DehazeNet_1(nn.Module):
    def __init__(self, input=16, groups=4):
        super(DehazeNet_1, self).__init__()

        self.conv1 = nn.Conv2d(in_channels=3, out_channels=16, kernel_size=5)
        self.relu1 = nn.ReLU()

        self.conv2 = nn.Conv2d(in_channels=4, out_channels=16, kernel_size=3, padding=1)
        self.relu2 = nn.ReLU()
        self.conv3 = nn.Conv2d(in_channels=4, out_channels=16, kernel_size=5, padding=2)
        self.relu3 = nn.ReLU()
        self.conv4 = nn.Conv2d(in_channels=4, out_channels=16, kernel_size=7, padding=3)
        self.relu4 = nn.ReLU()
        self.maxpool = nn.MaxPool2d(kernel_size=7, stride=1)
        self.conv5 = nn.Conv2d(in_channels=48, out_channels=1, kernel_size=6)
        
    
    def forward(self, x):
        #feature extraction
        out = self.conv1(x)
        out = self.relu1(out)
        #maxout
        max_1 = torch.max(out[:,0:4,:,:],out[:,4:8,:,:])
        max_2 = torch.max(out[:,8:12,:,:],out[:,12:16,:,:])
        out = torch.max(max_1,max_2)

        #multi-scale Mapping
        out1 = self.conv2(out)
        out1 = self.relu2(out1)
        out2 = self.conv3(out)
        out2 = self.relu3(out2)
        out3 = self.conv4(out)
        out3 = self.relu4(out3)
        y = torch.cat((out1,out2,out3), dim=1)
        #Local Extremum
        y = self.maxpool(y)
        #non-linear Regression
        y = self.conv5(y)
        y = torch.max(y, torch.zeros(y.shape[0],y.shape[1],y.shape[2],y.shape[3]))
        y = torch.min(y, torch.ones(y.shape[0],y.shape[1],y.shape[2],y.shape[3]))
        return y
    

# BRelu used for GPU. Need to add that reference in pytorch source file.
class BRelu(nn.Hardtanh):
	def __init__(self, inplace=False):
		super(BRelu, self).__init__(0., 1., inplace)
		
	def extra_repr(self):
		inplace_str = 'inplace=True' if self.inplace else ''
		return inplace_str


class DehazeNet_2(nn.Module):
	def __init__(self, input=16, groups=4):
		super(DehazeNet_2, self).__init__()
		self.input = input
		self.groups = groups
		self.conv1 = nn.Conv2d(in_channels=3, out_channels=self.input, kernel_size=5)
		self.conv2 = nn.Conv2d(in_channels=4, out_channels=16, kernel_size=3, padding=1)
		self.conv3 = nn.Conv2d(in_channels=4, out_channels=16, kernel_size=5, padding=2)
		self.conv4 = nn.Conv2d(in_channels=4, out_channels=16, kernel_size=7, padding=3)
		self.maxpool = nn.MaxPool2d(kernel_size=7, stride=1)
		self.conv5 = nn.Conv2d(in_channels=48, out_channels=1, kernel_size=6)
		self.brelu = BRelu()
		for name, m in self.named_modules():
			# lambda : 定义简单的函数    lambda x: 表达式
			# map(func, iter)  iter 依次调用 func
			# any : 有一个是true就返回true
			if isinstance(m, nn.Conv2d):
				# 初始化 weight 和 bias
				nn.init.normal(m.weight, mean=0,std=0.001)
				if m.bias is not None:
					nn.init.constant_(m.bias, 0)
	
	def Maxout(self, x, groups):
		x = x.reshape(x.shape[0], groups, x.shape[1]//groups, x.shape[2], x.shape[3])
		x, y = torch.max(x, dim=2, keepdim=True)
		out = x.reshape(x.shape[0],-1, x.shape[3], x.shape[4])
		return out
	#BRelu used to CPU. It can't work on GPU.
	def BRelu(self, x):
		x = torch.max(x, torch.zeros(x.shape[0],x.shape[1],x.shape[2],x.shape[3]))
		x = torch.min(x, torch.ones(x.shape[0],x.shape[1],x.shape[2],x.shape[3]))
		return x
	
	def forward(self, x):
		out = self.conv1(x)
		out = self.Maxout(out, self.groups)
		out1 = self.conv2(out)
		out2 = self.conv3(out)
		out3 = self.conv4(out)
		y = torch.cat((out1,out2,out3), dim=1)
		#print(y.shape[0],y.shape[1],y.shape[2],y.shape[3],)
		y = self.maxpool(y)
		#print(y.shape[0],y.shape[1],y.shape[2],y.shape[3],)
		y = self.conv5(y)
		# y = self.relu(y)
		# y = self.BRelu(y)
		#y = torch.min(y, torch.ones(y.shape[0],y.shape[1],y.shape[2],y.shape[3]))
		y = self.brelu(y)
		y = y.reshape(y.shape[0],-1)
		return y


loader = torchvision.transforms.Compose([
	transforms.ToTensor(),
	transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])
augmentation = torchvision.transforms.Compose([
	transforms.RandomHorizontalFlip(0.5),
	transforms.RandomVerticalFlip(0.5),
	transforms.RandomRotation(30),
	transforms.ToTensor(),
	transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

# Dark Channel Piro
class DarkChannelPrior(nn.Module):
    def __init__(self,kernel_size,top_candidates_ratio,omega,
                 radius, eps,
                 open_threshold=True,
                 depth_est=False):
        super().__init__()
        
        # dark channel piror
        self.kernel_size = kernel_size
        self.pad = nn.ReflectionPad2d(padding=kernel_size//2)
        self.unfold = nn.Unfold(kernel_size=(self.kernel_size,self.kernel_size),padding=0)
        
        # airlight estimation.
        self.top_candidates_ratio = top_candidates_ratio
        self.open_threshold = open_threshold
        
        # raw transmission estimation 
        self.omega = omega
        
        # image guided filtering
        self.radius = radius
        self.eps = eps
        self.guide_filter = GuidedFilter2d(radius=self.radius,eps= self.eps)
        
        self.depth_est = depth_est
        
    def forward(self,image):
        
        # compute the dark channel piror of given image.
        b,c,h,w = image.shape
        image_pad = self.pad(image)
        local_patches = self.unfold(image_pad)
        dc,dc_index = torch.min(local_patches,dim=1,keepdim=True)
        dc = dc.view(b,1,h,w)
        dc_vis = dc
        # airlight estimation.
        top_candidates_nums = int(h*w*self.top_candidates_ratio)
        dc = dc.view(b,1,-1) # dark channels
        searchidx = torch.argsort(-dc,dim=-1)[:,:,:top_candidates_nums]
        searchidx = searchidx.repeat(1,3,1)
        image_ravel = image.view(b,3,-1)
        value = torch.gather(image_ravel,dim=2,index=searchidx)
        airlight,image_index = torch.max(value,dim =-1,keepdim=True)
        airlight = airlight.squeeze(-1)
        if self.open_threshold:
            airlight = torch.clamp(airlight,max=220)
        
        # get the raw transmission
        airlight = airlight.unsqueeze(-1).unsqueeze(-1)
        processed = image/airlight
        
        processed_pad = self.pad(processed)
        local_patches_processed = self.unfold(processed_pad)
        dc_processed, dc_index_processed = torch.min(local_patches_processed,dim=1,keepdim=True)
        dc_processed = dc_processed.view(b,1,h,w)
        
        raw_t = 1.0 - self.omega * dc_processed
        if self.open_threshold:
            raw_t = torch.clamp(raw_t,min=0.2)
            
        # raw transmission guided filtering.
        # refined_tranmission = soft_matting(image_data_tensor,raw_transmission,r=40,eps=1e-3)
        normalized_img = simple_image_normalization(image)
        refined_transmission = self.guide_filter(raw_t,normalized_img)
        
        
        # recover image: get radiance.
        image = image.float()
        tiledt = refined_transmission.repeat(1,3,1,1)
        
        dehaze_images = (image - airlight)*1.0/tiledt + airlight
        
        # recover scaled depth or not
        if self.depth_est:
            depth = recover_depth(refined_transmission)
            return dehaze_images, dc_vis,airlight,raw_t,refined_transmission,depth
        
        return dehaze_images, dc_vis,airlight,raw_t,refined_transmission



def simple_image_normalization(tensor):
    b,c,h,w = tensor.shape
    tensor_ravel = tensor.view(b,3,-1)
    image_min,_ = torch.min(tensor_ravel,dim=-1,keepdim=True)
    image_max,_ = torch.max(tensor_ravel,dim=-1,keepdim=True)
    image_min = image_min.unsqueeze(-1)
    image_max = image_max.unsqueeze(-1)
    
    normalized_image = (tensor - image_min) /(image_max-image_min)
    return normalized_image

def recover_depth(transmission,beta=0.001):
    negative_depth = torch.log(transmission)
    return (-negative_depth)/beta

class AOD_net(nn.Module):

	def __init__(self):
		super(AOD_net, self).__init__()

		self.relu = nn.ReLU(inplace=True)
	
		self.e_conv1 = nn.Conv2d(3,3,1,1,0,bias=True) 
		self.e_conv2 = nn.Conv2d(3,3,3,1,1,bias=True) 
		self.e_conv3 = nn.Conv2d(6,3,5,1,2,bias=True) 
		self.e_conv4 = nn.Conv2d(6,3,7,1,3,bias=True) 
		self.e_conv5 = nn.Conv2d(12,3,3,1,1,bias=True) 
		
	def forward(self, x):
		source = []
		source.append(x)

		x1 = self.relu(self.e_conv1(x))
		x2 = self.relu(self.e_conv2(x1))

		concat1 = torch.cat((x1,x2), 1)
		x3 = self.relu(self.e_conv3(concat1))

		concat2 = torch.cat((x2, x3), 1)
		x4 = self.relu(self.e_conv4(concat2))

		concat3 = torch.cat((x1,x2,x3,x4),1)
		x5 = self.relu(self.e_conv5(concat3))

		clean_image = self.relu((x5 * x) - x5 + 1) 
		
		return clean_image


class TOENet(nn.Module):
	def __init__(self):
		super(TOENet,self).__init__()

		self.mns = MainNetworkStructure(3,8)
         
	def forward(self,x):
        
		Fout = self.mns(x) + x
      
		return Fout


class MainNetworkStructure(nn.Module):
	def __init__(self,inchannel,channel):
		super(MainNetworkStructure,self).__init__()
        

		self.cfceb_l = CCEM(channel)
		self.cfceb_m = CCEM(channel*2)
		self.cfceb_s = CCEM(channel*4)

		self.ein = BRB(channel)
		self.el = BRB(channel)
		self.em = BRB(channel*2)
		self.es = BRB(channel*4)
		self.ds = BRB(channel*4)
		self.dm = BRB(channel*2)
		self.dl = BRB(channel)
        
		self.conv_eltem = nn.Conv2d(channel,2*channel,kernel_size=1,stride=1,padding=0,bias=False)   
		self.conv_emtes = nn.Conv2d(2*channel,4*channel,kernel_size=1,stride=1,padding=0,bias=False)   

		self.conv_r_eltem = nn.Conv2d(channel,2*channel,kernel_size=1,stride=1,padding=0,bias=False)   
		self.conv_r_emtes = nn.Conv2d(2*channel,4*channel,kernel_size=1,stride=1,padding=0,bias=False) 
        
		self.conv_g_eltem = nn.Conv2d(channel,2*channel,kernel_size=1,stride=1,padding=0,bias=False)   
		#self.conv_g_emtes = nn.Conv2d(2*channel,4*channel,kernel_size=1,stride=1,padding=0,bias=False)
        
		self.conv_b_eltem = nn.Conv2d(channel,2*channel,kernel_size=1,stride=1,padding=0,bias=False)   
		#self.conv_b_emtes = nn.Conv2d(2*channel,4*channel,kernel_size=1,stride=1,padding=0,bias=False)
        
		self.conv_dstdm = nn.Conv2d(4*channel,2*channel,kernel_size=1,stride=1,padding=0,bias=False)   
		self.conv_dmtdl = nn.Conv2d(2*channel,channel,kernel_size=1,stride=1,padding=0,bias=False)  

		self.conv_r_in = nn.Conv2d(1,channel,kernel_size=1,stride=1,padding=0,bias=False)    
		self.conv_g_in = nn.Conv2d(1,channel,kernel_size=1,stride=1,padding=0,bias=False)    
		self.conv_b_in = nn.Conv2d(1,channel,kernel_size=1,stride=1,padding=0,bias=False)            
		self.conv_in = nn.Conv2d(inchannel,channel,kernel_size=1,stride=1,padding=0,bias=False)    
        
		self.conv_out = nn.Conv2d(channel,3,kernel_size=1,stride=1,padding=0,bias=False)    
    		

		self.maxpool = nn.MaxPool2d(kernel_size=3,stride=2,padding=1)


	def _upsample(self,x,y):
		_,_,H,W = y.size()
		return F.upsample(x,size=(H,W),mode='bilinear')

	def forward(self,x):
        
		r = self.conv_r_in(x[:,0,:,:].unsqueeze(1))
		g = self.conv_g_in(x[:,1,:,:].unsqueeze(1))    
		b = self.conv_b_in(x[:,2,:,:].unsqueeze(1))
      
		x_r_l, x_g_l, x_b_l, x_out_l = self.cfceb_l(r,g,b)
		x_r_m, x_g_m, x_b_m, x_out_m = self.cfceb_m(self.conv_r_eltem(self.maxpool(x_r_l)), self.conv_g_eltem(self.maxpool(x_g_l)), self.conv_b_eltem(self.maxpool(x_b_l)))
		_, _, _, x_out_s = self.cfceb_s(self.conv_r_emtes(self.maxpool(x_r_m)), self.conv_r_emtes(self.maxpool(x_g_m)), self.conv_r_emtes(self.maxpool(x_b_m)))
        
		x_elin = self.ein(self.conv_in(x))
		elout = self.el(x_elin * x_out_l)
		x_emin = self.conv_eltem(self.maxpool(elout))      
		emout = self.em(x_emin * x_out_m)
		x_esin = self.conv_emtes(self.maxpool(emout))          
		esout = self.es(x_esin * x_out_s)
		dsout = self.ds(esout)       
		x_dmin = self._upsample(self.conv_dstdm(dsout),emout) + emout
		dmout = self.dm(x_dmin)
		x_dlin = self._upsample(self.conv_dmtdl(dmout),elout) + elout    
		dlout = self.dl(x_dlin)
		x_out = self.conv_out(dlout)

		return x_out


class CCEM(nn.Module):
	def __init__(self,channel):
		super(CCEM,self).__init__()

		self.bb_R = BRB(channel)
		self.bb_G = BRB(channel)
		self.bb_B = BRB(channel)

		self.cab = CAB(2*channel)
		self.cab_RGB = CAB(3*channel)
        
		self.conv_out1 = nn.Conv2d(channel*2,channel,kernel_size=1,stride=1,padding=0,bias=False)
		self.conv_out2 = nn.Conv2d(channel*3,channel,kernel_size=1,stride=1,padding=0,bias=False)
        
	def forward(self,r,g,b):
        
		x_r = self.bb_R(r)
		x_g = self.bb_G(g)
		x_b = self.bb_B(b)

		x_r_a = self.conv_out1(self.cab(torch.cat((x_r,x_g),1))) #+ x_r + x_g
		x_g_a = self.conv_out1(self.cab(torch.cat((x_r,x_b),1))) #+ x_r + x_b
		x_b_a = self.conv_out1(self.cab(torch.cat((x_g,x_b),1))) #+ x_g + x_b 
		x_rgb_a = self.cab_RGB(torch.cat((x_r,x_g,x_b),1))#*torch.cat((x_r,x_g,x_b),1)
        
		x_out = self.conv_out2(torch.cat((x_r_a , x_g_a , x_b_a),1)+x_rgb_a) # + x_r + x_g + x_b 

		return	x_r, x_g, x_b, x_out
    
    
class BRB(nn.Module):
	def __init__(self,channel,norm=False):                                
		super(BRB,self).__init__()

		self.conv_1 = nn.Conv2d(channel,channel,kernel_size=3,stride=1,padding=1,bias=False)
		self.conv_2 = nn.Conv2d(channel,channel,kernel_size=3,stride=1,padding=1,bias=False)
		#self.conv_3 = nn.Conv2d(channel,channel,kernel_size=3,stride=1,padding=1,bias=False)
        
		self.conv_out = nn.Conv2d(channel,channel,kernel_size=3,stride=1,padding=1,bias=False)
        
		self.act = nn.PReLU(channel)

		self.norm = nn.GroupNorm(num_channels=channel,num_groups=1)# nn.InstanceNorm2d(channel)#
   
	def forward(self,x):
        
		x_1 = self.act(self.norm(self.conv_1(x)))
		x_2 = self.act(self.norm(self.conv_2(x_1)))
		x_out = self.act(self.norm(self.conv_out(x_2)) + x)

		return	x_out
    
      
class CAB(nn.Module):
    def __init__(self , in_planes , ration = 4):
        super(CAB, self).__init__()

        self.avg_pool = nn.AdaptiveAvgPool2d(1)
        self.max_pool = nn.AdaptiveMaxPool2d(1)

        self.fc1 = nn.Conv2d(in_planes , in_planes // ration , 1 , bias = False)
        self.act1 = nn.PReLU(in_planes // ration)
        self.fc2 = nn.Conv2d(in_planes // ration , in_planes , 1 , bias = False)
        self.sigmoid = nn.Sigmoid()
        self.norm1 = nn.GroupNorm(num_channels=in_planes // ration,num_groups=1)
        self.norm2 = nn.GroupNorm(num_channels=in_planes,num_groups=1)
        
    def forward(self , x):
        avg_out = self.norm2(self.fc2(self.act1(self.norm1(self.fc1(self.avg_pool(x))))))
        max_out = self.norm2(self.fc2(self.act1(self.norm1(self.fc1(self.max_pool(x))))))
        camap = self.sigmoid(avg_out + max_out)
        
        return camap

class Encoder(nn.Module):
    def __init__(self):
        super(Encoder, self).__init__()
        #Conv1
        self.layer1 = nn.Conv2d(3, 32, kernel_size=3, padding=1)
        self.layer2 = nn.Sequential(
            nn.Conv2d(32, 32, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.Conv2d(32, 32, kernel_size=3, padding=1)
            )
        self.layer3 = nn.Sequential(
            nn.Conv2d(32, 32, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.Conv2d(32, 32, kernel_size=3, padding=1)
            )
        #Conv2
        self.layer5 = nn.Conv2d(32, 64, kernel_size=3, stride=2, padding=1)
        self.layer6 = nn.Sequential(
            nn.Conv2d(64, 64, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.Conv2d(64, 64, kernel_size=3, padding=1)
            )
        self.layer7 = nn.Sequential(
            nn.Conv2d(64, 64, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.Conv2d(64, 64, kernel_size=3, padding=1)
            )
        #Conv3
        self.layer9 = nn.Conv2d(64, 128, kernel_size=3, stride=2, padding=1)
        self.layer10 = nn.Sequential(
            nn.Conv2d(128, 128, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.Conv2d(128, 128, kernel_size=3, padding=1)
            )
        self.layer11 = nn.Sequential(
            nn.Conv2d(128, 128, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.Conv2d(128, 128, kernel_size=3, padding=1)
            )
        
    def forward(self, x):
        #Conv1
        x = self.layer1(x)
        x = self.layer2(x) + x
        x = self.layer3(x) + x
        #Conv2
        x = self.layer5(x)
        x = self.layer6(x) + x
        x = self.layer7(x) + x
        #Conv3
        x = self.layer9(x)    
        x = self.layer10(x) + x
        x = self.layer11(x) + x 
        return x

class Decoder(nn.Module):
    def __init__(self):
        super(Decoder, self).__init__()        
        # Deconv3
        self.layer13 = nn.Sequential(
            nn.Conv2d(128, 128, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.Conv2d(128, 128, kernel_size=3, padding=1)
            )
        self.layer14 = nn.Sequential(
            nn.Conv2d(128, 128, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.Conv2d(128, 128, kernel_size=3, padding=1)
            )
        self.layer16 = nn.ConvTranspose2d(128, 64, kernel_size=4, stride=2, padding=1)
        #Deconv2
        self.layer17 = nn.Sequential(
            nn.Conv2d(64, 64, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.Conv2d(64, 64, kernel_size=3, padding=1)
            )
        self.layer18 = nn.Sequential(
            nn.Conv2d(64, 64, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.Conv2d(64, 64, kernel_size=3, padding=1)
            )
        self.layer20 = nn.ConvTranspose2d(64, 32, kernel_size=4, stride=2, padding=1)
        #Deconv1
        self.layer21 = nn.Sequential(
            nn.Conv2d(32, 32, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.Conv2d(32, 32, kernel_size=3, padding=1)
            )
        self.layer22 = nn.Sequential(
            nn.Conv2d(32, 32, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.Conv2d(32, 32, kernel_size=3, padding=1)
            )
        self.layer24 = nn.Conv2d(32, 3, kernel_size=3, padding=1)
        
    def forward(self,x):        
        #Deconv3
        x = self.layer13(x) + x
        x = self.layer14(x) + x
        x = self.layer16(x)                
        #Deconv2
        x = self.layer17(x) + x
        x = self.layer18(x) + x
        x = self.layer20(x)
        #Deconv1
        x = self.layer21(x) + x
        x = self.layer22(x) + x
        x = self.layer24(x)
        return x
	

def trainable(net, trainable):
    for para in net.parameters():
        para.requires_grad = trainable

#Initialize VGG16 with pretrained weight on ImageNet
def vgg_init():
    vgg_model = torchvision.models.vgg16(pretrained = True).cuda()
    trainable(vgg_model, False)
    return vgg_model

#Extract features from internal layers for perceptual loss
class vgg(nn.Module):
    def __init__(self, vgg_model):
        super(vgg, self).__init__()
        self.vgg_layers = vgg_model.features
        self.layer_name_mapping = {
            '1': "relu1_1",
            '3': "relu1_2",
            '6': "relu2_1",
            '8': "relu2_2"
        }

    def forward(self, x):
        output = []
        for name, module in self.vgg_layers._modules.items():
            x = module(x)
            if name in self.layer_name_mapping:
                output.append(x)
        return output
    
#Set iteration time
ITERATION = 4

#Model
class Generator(nn.Module):
    def __init__(self):
        super(Generator, self).__init__()
        self.det_conv0 = nn.Sequential(
            nn.Conv2d(4, 32, 3, 1, 1),
            nn.ReLU()
            )
        self.det_conv1 = nn.Sequential(
            nn.Conv2d(32, 32, 3, 1, 1),
            nn.ReLU(),
            nn.Conv2d(32, 32, 3, 1, 1),
            nn.ReLU()
            )
        self.det_conv2 = nn.Sequential(
            nn.Conv2d(32, 32, 3, 1, 1),
            nn.ReLU(),
            nn.Conv2d(32, 32, 3, 1, 1),
            nn.ReLU()
            )
        self.det_conv3 = nn.Sequential(
            nn.Conv2d(32, 32, 3, 1, 1),
            nn.ReLU(),
            nn.Conv2d(32, 32, 3, 1, 1),
            nn.ReLU()
            )
        self.det_conv4 = nn.Sequential(
            nn.Conv2d(32, 32, 3, 1, 1),
            nn.ReLU(),
            nn.Conv2d(32, 32, 3, 1, 1),
            nn.ReLU()
            )
        self.det_conv5 = nn.Sequential(
            nn.Conv2d(32, 32, 3, 1, 1),
            nn.ReLU(),
            nn.Conv2d(32, 32, 3, 1, 1),
            nn.ReLU()
            )
        self.conv_i = nn.Sequential(
            nn.Conv2d(32 + 32, 32, 3, 1, 1),
            nn.Sigmoid()
            )
        self.conv_f = nn.Sequential(
            nn.Conv2d(32 + 32, 32, 3, 1, 1),
            nn.Sigmoid()
            )
        self.conv_g = nn.Sequential(
            nn.Conv2d(32 + 32, 32, 3, 1, 1),
            nn.Tanh()
            )
        self.conv_o = nn.Sequential(
            nn.Conv2d(32 + 32, 32, 3, 1, 1),
            nn.Sigmoid()
            )
        self.det_conv_mask = nn.Sequential(
            nn.Conv2d(32, 1, 3, 1, 1),
            )
        self.conv1 = nn.Sequential(
            nn.Conv2d(4, 64, 5, 1, 2),
            nn.ReLU()
            )
        self.conv2 = nn.Sequential(
            nn.Conv2d(64, 128, 3, 2, 1),
            nn.ReLU()
            )
        self.conv3 = nn.Sequential(
            nn.Conv2d(128, 128, 3, 1, 1),
            nn.ReLU()
            )
        self.conv4 = nn.Sequential(
            nn.Conv2d(128, 256, 3, 2, 1),
            nn.ReLU()
            )
        self.conv5 = nn.Sequential(
            nn.Conv2d(256, 256, 3, 1, 1),
            nn.ReLU()
            )
        self.conv6 = nn.Sequential(
            nn.Conv2d(256, 256, 3, 1, 1),
            nn.ReLU()
            )
        self.diconv1 = nn.Sequential(
            nn.Conv2d(256, 256, 3, 1, 2, dilation = 2),
            nn.ReLU()
            )
        self.diconv2 = nn.Sequential(
            nn.Conv2d(256, 256, 3, 1, 4, dilation = 4),
            nn.ReLU()
            )
        self.diconv3 = nn.Sequential(
            nn.Conv2d(256, 256, 3, 1, 8, dilation = 8),
            nn.ReLU()
            )
        self.diconv4 = nn.Sequential(
            nn.Conv2d(256, 256, 3, 1, 16, dilation = 16),
            nn.ReLU()
            )
        self.conv7 = nn.Sequential(
            nn.Conv2d(256, 256, 3, 1, 1),
            nn.ReLU()
            )
        self.conv8 = nn.Sequential(
            nn.Conv2d(256, 256, 3, 1, 1),
            nn.ReLU()
            )
        self.deconv1 = nn.Sequential(
            nn.ConvTranspose2d(256, 128, 4, 2, 1),
            nn.ReflectionPad2d((1, 0, 1, 0)),
            nn.AvgPool2d(2, stride = 1),
            nn.ReLU()
            )
        self.conv9 = nn.Sequential(
            nn.Conv2d(128, 128, 3, 1, 1),
            nn.ReLU()
            )
        self.deconv2 = nn.Sequential(
            nn.ConvTranspose2d(128, 64, 4, 2, 1),
            nn.ReflectionPad2d((1, 0, 1, 0)),
            nn.AvgPool2d(2, stride = 1),
            nn.ReLU()
            )
        self.conv10 = nn.Sequential(
            nn.Conv2d(64, 32, 3, 1, 1),
            nn.ReLU()
            )
        self.outframe1 = nn.Sequential(
            nn.Conv2d(256, 3, 3, 1, 1),
            nn.ReLU()
            )
        self.outframe2 = nn.Sequential(
            nn.Conv2d(128, 3, 3, 1, 1),
            nn.ReLU()
            )
        self.output = nn.Sequential(
            nn.Conv2d(32, 3, 3, 1, 1)
            )

    def forward(self, input):
        batch_size, row, col = input.size(0), input.size(2), input.size(3)
        if torch.cuda.is_available():
            mask = Variable(torch.ones(batch_size, 1, row, col)).cuda() / 2.
            h = Variable(torch.zeros(batch_size, 32, row, col)).cuda() 
            c = Variable(torch.zeros(batch_size, 32, row, col)).cuda()
        else:
            mask = Variable(torch.ones(batch_size, 1, row, col)) / 2.
            h = Variable(torch.zeros(batch_size, 32, row, col)) 
            c = Variable(torch.zeros(batch_size, 32, row, col))            
        mask_list = []
        for i in range(ITERATION):
            x = torch.cat((input, mask), 1)
            x = self.det_conv0(x)
            resx = x
            x = F.relu(self.det_conv1(x) + resx)
            resx = x
            x = F.relu(self.det_conv2(x) + resx)
            resx = x
            x = F.relu(self.det_conv3(x) + resx)
            resx = x
            x = F.relu(self.det_conv4(x) + resx)
            resx = x
            x = F.relu(self.det_conv5(x) + resx)
            x = torch.cat((x, h), 1)
            i = self.conv_i(x)
            f = self.conv_f(x)
            g = self.conv_g(x)
            o = self.conv_o(x)
            c = f * c + i * g
            h = o * F.tanh(c)
            mask = self.det_conv_mask(h)
            mask_list.append(mask)
        x = torch.cat((input, mask), 1)
        x = self.conv1(x)
        res1 = x
        x = self.conv2(x)
        x = self.conv3(x)
        res2 = x
        x = self.conv4(x)
        x = self.conv5(x)
        x = self.conv6(x)
        x = self.diconv1(x)
        x = self.diconv2(x)
        x = self.diconv3(x)
        x = self.diconv4(x)
        x = self.conv7(x)
        x = self.conv8(x)
        frame1 = self.outframe1(x)
        x = self.deconv1(x)
        x = x + res2
        x = self.conv9(x)
        frame2 = self.outframe2(x)
        x = self.deconv2(x)
        x = x + res1
        x = self.conv10(x)
        x = self.output(x)
        return mask_list, frame1, frame2, x
    
class Discriminator(nn.Module):
    def __init__(self):
        super(Discriminator, self).__init__()
        self.conv1 = nn.Sequential(
            nn.Conv2d(3, 8, 5, 1, 2),
            nn.ReLU()
            )
        self.conv2 = nn.Sequential(
            nn.Conv2d(8, 16, 5, 1, 2),
            nn.ReLU()
            )
        self.conv3 = nn.Sequential(
            nn.Conv2d(16, 64, 5, 1, 2),
            nn.ReLU()
            )
        self.conv4 = nn.Sequential(
            nn.Conv2d(64, 128, 5, 1, 2),
            nn.ReLU()
            )
        self.conv5 = nn.Sequential(
            nn.Conv2d(128, 128, 5, 1, 2),
            nn.ReLU()
            )
        self.conv6 = nn.Sequential(
            nn.Conv2d(128, 128, 5, 1, 2),
            nn.ReLU()
            )
        self.conv_mask = nn.Sequential(
            nn.Conv2d(128, 1, 5, 1, 2)
            )
        self.conv7 = nn.Sequential(
            nn.Conv2d(128, 64, 5, 4, 1),
            nn.ReLU()
            )
        self.conv8 = nn.Sequential(
            nn.Conv2d(64, 32, 5, 4, 1),
            nn.ReLU()
            )
        self.fc = nn.Sequential(
            nn.Linear(32 * 14 * 14, 1024),
            nn.Linear(1024, 1),
            nn.Sigmoid()
            )

    def forward(self, x):
        x = self.conv1(x)
        x = self.conv2(x)
        x = self.conv3(x)
        x = self.conv4(x)
        x = self.conv5(x)
        x = self.conv6(x)
        mask = self.conv_mask(x)
        x = self.conv7(x * mask)
        x = self.conv7(x)
        x = self.conv8(x)
        x = x.view(x.size(0), -1)
        return mask, self.fc(x)
    
class Semi_Encoder(nn.Module):
    def __init__(self, n_downsample=2, n_res=3, input_dim=3, dim=64, norm='in', activ='relu', pad_type='reflect'):
        super(Semi_Encoder, self).__init__()
        self.model = []
        self.model += [Conv2dBlock(input_dim, dim, 7, 1, 3, norm=norm, activation=activ, pad_type=pad_type)]
        # downsampling blocks
        for i in range(n_downsample):
            self.model += [Conv2dBlock(dim, 2 * dim, 4, 2, 1, norm=norm, activation=activ, pad_type=pad_type)]
            dim *= 2
        # residual blocks
        self.model += [ResBlocks(n_res, dim, norm=norm, activation=activ, pad_type=pad_type)]
        self.model = nn.Sequential(*self.model)
        
    def get_entropy(self,tensors,norm='in', activ='relu', pad_type='reflect'):
        if torch.cuda.is_available():
            avgpool_layer = nn.AvgPool2d((4, 4), stride=(4, 4)).cuda()
            maxpool_layer = nn.MaxPool2d((4, 4), stride=(4, 4)).cuda()
            conv_layer = Conv2dBlock(2, 1, 7, 1, 3, norm=norm, activation=activ, pad_type=pad_type).cuda()
        else:
            avgpool_layer = nn.AvgPool2d((4, 4), stride=(4, 4))
            maxpool_layer = nn.MaxPool2d((4, 4), stride=(4, 4))
            conv_layer = Conv2dBlock(2, 1, 7, 1, 3, norm=norm, activation=activ, pad_type=pad_type)

        dst = []

        for i in range(tensors.size(0)):
            img = tensors[i].cpu().numpy()

            gray = color.rgb2gray(img.transpose([1, 2, 0]).squeeze())
            
            dst += [sfr.entropy(gray, disk(11))[np.newaxis, :, :]]  

        if torch.cuda.is_available():
            dst_tensor = torch.Tensor(dst).float().cuda()
        else:
            dst_tensor = torch.Tensor(dst).float()
        avg_tensor = avgpool_layer(dst_tensor)
        max_tensor = maxpool_layer(dst_tensor)
        dst_tensor = torch.cat([avg_tensor,max_tensor], 1)
        dst_tensor = conv_layer(dst_tensor)
        dst_tensor = F.softmax(dst_tensor, dim=1)
        return dst_tensor



    def forward(self, x):
        haze_z = self.model(x)
        haze_entropy = self.get_entropy(x,norm='in',activ='relu', pad_type='reflect')
        attention_haze = haze_entropy * haze_z
        
        return attention_haze
        
         
        

class Semi_Decoder(nn.Module):
    def __init__(self, n_upsample=2, n_res=4, dim=256, output_dim=3, res_norm='in', activ='relu', pad_type='zero'):
        super(Semi_Decoder, self).__init__()

        self.model = []
        # AdaIN residual blocks
        self.model += [ResBlocks(n_res, dim, res_norm, activ, pad_type=pad_type)]
        # upsampling blocks
        for i in range(n_upsample):
            self.model += [nn.Upsample(scale_factor=2),
                           Conv2dBlock(dim, dim // 2, 5, 1, 2, norm='ln', activation=activ, pad_type=pad_type)]
            dim //= 2
        # use reflection padding in the last conv layer
        self.model += [Conv2dBlock(dim, output_dim, 7, 1, 3, norm='none', activation='tanh', pad_type=pad_type)]
        self.model = nn.Sequential(*self.model)

    def forward(self, x):
        return self.model(x)


        






class ReLUINSConvTranspose2d(nn.Module):
  def __init__(self, n_in, n_out, kernel_size, stride, padding, output_padding):
    super(ReLUINSConvTranspose2d, self).__init__()
    model = []
    model += [nn.ConvTranspose2d(n_in, n_out, kernel_size=kernel_size, stride=stride, padding=padding, output_padding=output_padding, bias=True)]
    model += [LayerNorm(n_out)]
    model += [nn.ReLU(inplace=True)]
    self.model = nn.Sequential(*model)
    self.model.apply(gaussian_weights_init)
  def forward(self, x):
    return self.model(x)

class INSResBlock(nn.Module):
  def conv3x3(self, inplanes, out_planes, stride=1):
    return [nn.ReflectionPad2d(1), nn.Conv2d(inplanes, out_planes, kernel_size=3, stride=stride)]
  def __init__(self, inplanes, planes, stride=1, dropout=0.0):
    super(INSResBlock, self).__init__()
    model = []
    model += self.conv3x3(inplanes, planes, stride)
    model += [nn.InstanceNorm2d(planes)]
    model += [nn.ReLU(inplace=True)]
    model += self.conv3x3(planes, planes)
    model += [nn.InstanceNorm2d(planes)]
    if dropout > 0:
      model += [nn.Dropout(p=dropout)]
    self.model = nn.Sequential(*model)
    self.model.apply(gaussian_weights_init)
  def forward(self, x):
    residual = x
    out = self.model(x)
    out += residual
    return out

def conv3x3(in_planes, out_planes):
  return [nn.ReflectionPad2d(1), nn.Conv2d(in_planes, out_planes, kernel_size=3, stride=1, padding=0, bias=True)]

def gaussian_weights_init(m):
  classname = m.__class__.__name__
  if classname.find('Conv') != -1 and classname.find('Conv') == 0:
    m.weight.data.normal_(0.0, 0.02)



def get_norm_layer(norm_type):
    if norm_type == "batch":
        norm_layer = functools.partial(nn.BatchNorm2d, affine=True)
    elif norm_type == "instance":
        norm_layer = functools.partial(nn.InstanceNorm2d, affine=False)

    else:
        raise NotImplementedError("normalization layer [%s] is not found" % norm_type)
    return norm_layer

class ResnetBlock(nn.Module):
    def __init__(
        self, dim, padding_type, norm_layer, opt, activation=nn.ReLU(True), use_dropout=False, dilation=1
    ):
        super(ResnetBlock, self).__init__()
        self.opt = opt
        self.dilation = dilation
        self.conv_block = self.build_conv_block(dim, padding_type, norm_layer, activation, use_dropout)

    def build_conv_block(self, dim, padding_type, norm_layer, activation, use_dropout):
        conv_block = []
        p = 0
        if padding_type == "reflect":
            conv_block += [nn.ReflectionPad2d(self.dilation)]
        elif padding_type == "replicate":
            conv_block += [nn.ReplicationPad2d(self.dilation)]
        elif padding_type == "zero":
            p = self.dilation
        else:
            raise NotImplementedError("padding [%s] is not implemented" % padding_type)

        conv_block += [
            nn.Conv2d(dim, dim, kernel_size=3, padding=p, dilation=self.dilation),
            norm_layer(dim),
            activation,
        ]
        if use_dropout:
            conv_block += [nn.Dropout(0.5)]

        p = 0
        if padding_type == "reflect":
            conv_block += [nn.ReflectionPad2d(1)]
        elif padding_type == "replicate":
            conv_block += [nn.ReplicationPad2d(1)]
        elif padding_type == "zero":
            p = 1
        else:
            raise NotImplementedError("padding [%s] is not implemented" % padding_type)
        conv_block += [nn.Conv2d(dim, dim, kernel_size=3, padding=p, dilation=1), norm_layer(dim)]

        return nn.Sequential(*conv_block)

    def forward(self, x):
        out = x + self.conv_block(x)
        return out




class ResBlocks(nn.Module):
    def __init__(self, num_blocks, dim, norm='in', activation='relu', pad_type='zero'):
        super(ResBlocks, self).__init__()
        self.model = []
        for i in range(num_blocks):
            self.model += [ResBlock(dim, norm=norm, activation=activation, pad_type=pad_type)]
        self.model = nn.Sequential(*self.model)

    def forward(self, x):
        return self.model(x)


class ResBlock(nn.Module):
    def __init__(self, dim, norm='in', activation='relu', pad_type='zero'):
        super(ResBlock, self).__init__()

        model = []
        model += [Conv2dBlock(dim, dim, 3, 1, 1, norm=norm, activation=activation, pad_type=pad_type)]
        model += [Conv2dBlock(dim, dim, 3, 1, 1, norm=norm, activation='none', pad_type=pad_type)]
        self.model = nn.Sequential(*model)

    def forward(self, x):
        residual = x
        out = self.model(x)
        out += residual
        return out


class Conv2dBlock(nn.Module):
    def __init__(self, input_dim, output_dim, kernel_size, stride,
                 padding=0, norm='none', activation='relu', pad_type='zero'):
        super(Conv2dBlock, self).__init__()
        self.use_bias = True
        # initialize padding
        if pad_type == 'reflect':
            self.pad = nn.ReflectionPad2d(padding)
        elif pad_type == 'replicate':
            self.pad = nn.ReplicationPad2d(padding)
        elif pad_type == 'zero':
            self.pad = nn.ZeroPad2d(padding)
        else:
            assert 0, "Unsupported padding type: {}".format(pad_type)

        # initialize normalization
        norm_dim = output_dim
        if norm == 'bn':
            self.norm = nn.BatchNorm2d(norm_dim)
        elif norm == 'in':
            # self.norm = nn.InstanceNorm2d(norm_dim, track_running_stats=True)
            self.norm = nn.InstanceNorm2d(norm_dim)
        elif norm == 'ln':
            self.norm = LayerNorm(norm_dim)
        elif norm == 'adain':
            self.norm = AdaptiveInstanceNorm2d(norm_dim)
        elif norm == 'none':
            self.norm = None
        else:
            assert 0, "Unsupported normalization: {}".format(norm)

        # initialize activation
        if activation == 'relu':
            self.activation = nn.ReLU(inplace=True)
        elif activation == 'lrelu':
            self.activation = nn.LeakyReLU(0.2, inplace=True)
        elif activation == 'prelu':
            self.activation = nn.PReLU()
        elif activation == 'selu':
            self.activation = nn.SELU(inplace=True)
        elif activation == 'tanh':
            self.activation = nn.Tanh()
        elif activation == 'none':
            self.activation = None
        else:
            assert 0, "Unsupported activation: {}".format(activation)

        # initialize convolution
        self.conv = nn.Conv2d(input_dim, output_dim, kernel_size, stride, bias=self.use_bias)

    def forward(self, x):
        x = self.conv(self.pad(x))
        if self.norm:
            x = self.norm(x)
        if self.activation:
            x = self.activation(x)
        return x

class LayerNorm(nn.Module):
    def __init__(self, num_features, eps=1e-5, affine=True):
        super(LayerNorm, self).__init__()
        self.num_features = num_features
        self.affine = affine
        self.eps = eps

        if self.affine:
            self.gamma = nn.Parameter(torch.Tensor(num_features).uniform_())
            self.beta = nn.Parameter(torch.zeros(num_features))

    def forward(self, x):
        shape = [-1] + [1] * (x.dim() - 1)
        # print(x.size())
        if x.size(0) == 1:
            # These two lines run much faster in pytorch 0.4 than the two lines listed below.
            mean = x.view(-1).mean().view(*shape)
            std = x.view(-1).std().view(*shape)
        else:
            mean = x.view(x.size(0), -1).mean(1).view(*shape)
            std = x.view(x.size(0), -1).std(1).view(*shape)

        x = (x - mean) / (std + self.eps)

        if self.affine:
            shape = [1, -1] + [1] * (x.dim() - 2)
            x = x * self.gamma.view(*shape) + self.beta.view(*shape)
        return x

class AdaptiveInstanceNorm2d(nn.Module):
    def __init__(self, num_features, eps=1e-5, momentum=0.1):
        super(AdaptiveInstanceNorm2d, self).__init__()
        self.num_features = num_features
        self.eps = eps
        self.momentum = momentum
        # weight and bias are dynamically assigned
        self.weight = None
        self.bias = None
        # just dummy buffers, not used
        self.register_buffer('running_mean', torch.zeros(num_features))
        self.register_buffer('running_var', torch.ones(num_features))

    def forward(self, x):
        assert self.weight is not None and self.bias is not None, "Please assign weight and bias before calling AdaIN!"
        b, c = x.size(0), x.size(1)
        running_mean = self.running_mean.repeat(b)
        running_var = self.running_var.repeat(b)

        # Apply instance norm
        x_reshaped = x.contiguous().view(1, b * c, *x.size()[2:])

        out = F.batch_norm(
            x_reshaped, running_mean, running_var, self.weight, self.bias,
            True, self.momentum, self.eps)

        return out.view(b, c, *x.size()[2:])

    def __repr__(self):
        return self.__class__.__name__ + '(' + str(self.num_features) + ')'






class NLayerDiscriminator(nn.Module):
    def __init__(self, input_nc=256, ndf=64, n_layers=3, norm_layer=nn.BatchNorm2d, use_sigmoid=True):
        super(NLayerDiscriminator, self).__init__()
        use_bias = nn.InstanceNorm2d

        kw = 4
        padw = 1
        sequence = [
            nn.Conv2d(input_nc, ndf, kernel_size=kw, stride=2, padding=padw),
            nn.LeakyReLU(0.2, True)
        ]

        nf_mult = 1
        nf_mult_prev = 1
        for n in range(1, n_layers):
            nf_mult_prev = nf_mult
            nf_mult = min(2 ** n, 8)
            sequence += [
                nn.Conv2d(ndf * nf_mult_prev, ndf * nf_mult,
                          kernel_size=3, stride=1, padding=1, bias=use_bias),
                norm_layer(ndf * nf_mult),
                nn.LeakyReLU(0.2, True)
            ]

        nf_mult_prev = nf_mult
        nf_mult = min(2 ** n_layers, 8)
        sequence += [
            nn.Conv2d(ndf * nf_mult_prev, ndf * nf_mult,
                      kernel_size=kw, stride=1, padding=padw, bias=use_bias),
            norm_layer(ndf * nf_mult),
            nn.LeakyReLU(0.2, True)
        ]

        sequence += [nn.Conv2d(ndf * nf_mult, 1, kernel_size=kw, stride=1, padding=padw)]

        if use_sigmoid:
            sequence += [nn.Sigmoid()]

        self.model = nn.Sequential(*sequence)

    def forward(self, input):
        return self.model(input)
        



class NLayerDiscriminator_dark(nn.Module):
    def __init__(self, input_nc=1, ndf=64, n_layers=3, norm_layer=nn.BatchNorm2d, use_sigmoid=True):
        super(NLayerDiscriminator_dark, self).__init__()
        use_bias = nn.InstanceNorm2d

        kw = 4
        padw = 1
        sequence = [
            nn.Conv2d(input_nc, ndf, kernel_size=kw, stride=2, padding=padw),
            nn.LeakyReLU(0.2, True)
        ]

        nf_mult = 1
        nf_mult_prev = 1
        for n in range(1, n_layers):
            nf_mult_prev = nf_mult
            nf_mult = min(2 ** n, 8)
            sequence += [
                nn.Conv2d(ndf * nf_mult_prev, ndf * nf_mult,
                          kernel_size=kw, stride=2, padding=padw, bias=use_bias),
                norm_layer(ndf * nf_mult),
                nn.LeakyReLU(0.2, True)
            ]

        nf_mult_prev = nf_mult
        nf_mult = min(2 ** n_layers, 8)
        sequence += [
            nn.Conv2d(ndf * nf_mult_prev, ndf * nf_mult,
                      kernel_size=kw, stride=1, padding=padw, bias=use_bias),
            norm_layer(ndf * nf_mult),
            nn.LeakyReLU(0.2, True)
        ]

        sequence += [nn.Conv2d(ndf * nf_mult, 1, kernel_size=kw, stride=1, padding=padw)]

        if use_sigmoid:
            sequence += [nn.Sigmoid()]

        self.model = nn.Sequential(*sequence)

    def forward(self, input):
        return self.model(input)
