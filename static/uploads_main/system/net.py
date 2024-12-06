import torch
import torch.nn as nn
import torchvision
from torchvision import transforms
from GuideFilter.guided_filter import GuidedFilter2d,FastGuidedFilter2d

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