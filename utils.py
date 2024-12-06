import sys
import numpy as np
import cv2
import math
from net import *
import torchvision.transforms as transforms
import torch
from torch import nn, optim
from torch.backends import cudnn
from torch.autograd import Variable
from PIL import Image
import os
from math import log10, sqrt
from skimage.metrics import structural_similarity as ssim
import base64
# import matlab.engine

#寻找暗通道
def DarkChannel(im,sz):
    b,g,r = cv2.split(im)
    dc = cv2.min(cv2.min(r,g),b)
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT,(sz,sz))
    dark = cv2.erode(dc,kernel)
    return dark

#估计大气光值
def AtmLight(im,dark):
    [h,w] = im.shape[:2]
    imsz = h*w
    numpx = int(max(math.floor(imsz/100),1))
    darkvec = dark.reshape(imsz,1)
    imvec = im.reshape(imsz,3)
    indices = darkvec.argsort()
    indices = indices[imsz-numpx::]
    atmsum = np.zeros([1,3])
    for ind in range(1,numpx):
        atmsum = atmsum + imvec[indices[ind]]
    A = atmsum / numpx
    return A

#导向滤波
def Guidedfilter(im,p,r,eps):
    mean_I = cv2.boxFilter(im,cv2.CV_64F,(r,r))
    mean_p = cv2.boxFilter(p, cv2.CV_64F,(r,r))
    mean_Ip = cv2.boxFilter(im*p,cv2.CV_64F,(r,r))
    cov_Ip = mean_Ip - mean_I*mean_p
    mean_II = cv2.boxFilter(im*im,cv2.CV_64F,(r,r))
    var_I   = mean_II - mean_I*mean_I
    a = cov_Ip/(var_I + eps)
    b = mean_p - a*mean_I
    mean_a = cv2.boxFilter(a,cv2.CV_64F,(r,r))
    mean_b = cv2.boxFilter(b,cv2.CV_64F,(r,r))
    q = mean_a*im + mean_b
    return q

#使用导向滤波对估计的投射图精细化
def TransmissionRefine(im,et):
    gray = cv2.cvtColor(im,cv2.COLOR_BGR2GRAY)
    gray = np.float64(gray)/255
    r = 50
    eps = 0.001
    t = Guidedfilter(gray,et,r,eps)
    return t

#根据投射图与全球大气光恢复出无雾图像
def Recover(im,t,A,tx = 0.1):
    res = np.empty(im.shape,im.dtype)
    t = cv2.max(t,tx)
    for ind in range(0,3):
        res[:,:,ind] = (im[:,:,ind]-A[0,ind])/t + A[0,ind]
    return res

def load_model(model_path,gpu = 0):
    print("==========> Building model")
    #设定要验证的模型
    model = DehazeNet_1()
    #设定模型对应的训练好的pth文件
    checkpoint = torch.load(model_path)
    #加载权重
    model.load_state_dict(checkpoint["state_dict"])
    #将模型放在GPU中
    if gpu:
        model = nn.DataParallel(model, device_ids=[i for i in range(1)]).cuda()
    return model

def image_numpy_to_tensor(image_np):
    image_data = torch.from_numpy(image_np) # [H,W,3]
    image_data = image_data.permute(2,0,1).unsqueeze(0)
    return image_data

# 计算PSNR平均值
def calculate_psnr_color(img1, img2):
    # 分离RGB通道
    img1_r, img1_g, img1_b = img1[:, :, 0], img1[:, :, 1], img1[:, :, 2]
    img2_r, img2_g, img2_b = img2[:, :, 0], img2[:, :, 1], img2[:, :, 2]
    
    # 计算每个通道的PSNR
    psnr_r = calculate_psnr(img1_r, img2_r)
    psnr_g = calculate_psnr(img1_g, img2_g)
    psnr_b = calculate_psnr(img1_b, img2_b)
    
    # 计算平均PSNR
    psnr_avg = (psnr_r + psnr_g + psnr_b) / 3
    return psnr_avg

# 计算单通道的PSNR
def calculate_psnr(img1, img2):
    """
    计算两个图像之间的PSNR。
    
    参数:
    img1: 原始图像数组。
    img2: 处理后的图像数组。
    
    返回:
    PSNR值。
    """
    original_yuv = cv2.cvtColor(img1, cv2.COLOR_BGR2YUV)
    reconstructed_yuv = cv2.cvtColor(img2.astype(np.float32), cv2.COLOR_BGR2YUV)
    original_y = original_yuv[:, :, 0]
    reconstructed_y = reconstructed_yuv[:, :, 0]

    # 将图像数据类型转换为浮点数，以确保计算精度
    img1 = img1.astype(np.float64)
    img2 = img2.astype(np.float64)

    # 计算两个图像之间的均方误差 (MSE)
    mse = np.mean((img1 - img2) ** 2)

    # 如果MSE为0，则PSNR理论上为无限大，这里设置一个很大的值
    if mse == 0:
        return float('inf')

    # 计算PSNR
    max_pixel = 255.0  # 对于8位的图像，最大像素值为255
    psnr = 20 * log10(max_pixel / sqrt(mse))
    
    return round(psnr, 3)

def calculate_ssim(image_a, image_b, win_size=None):
    """
    计算两个图像之间的SSIM值。
    
    参数:
    image_a: 原始图像
    image_b: 去雾后的图像
    
    返回:
    ssim_value: SSIM值
    """
    # 确保图像数据类型一致
    if image_a.dtype != image_b.dtype:
        raise ValueError("输入图像的数据类型必须相同。")
    image_a = cv2.cvtColor(image_a, cv2.COLOR_BGR2RGB)
    image_b = cv2.cvtColor(image_b, cv2.COLOR_BGR2RGB)
    # 将图像数据转换为浮点型，范围[0, 1]
    image_a = image_a.astype(np.float64) / 255.0
    image_b = image_b.astype(np.float64) / 255.0
    # 如果没有提供win_size，或者提供的win_size大于图像尺寸，则自动计算一个合适的win_size
    if win_size is None or win_size > min(image_a.shape[:2]):
        win_size = min(image_a.shape[:2]) - (min(image_a.shape[:2]) % 2) - 1
    # 计算SSIM
    ssim_value = ssim(image_a, image_b, win_size=win_size, multichannel=True, channel_axis=2,data_range=1.0)
    
    return round(ssim_value, 3)

def calculate_mg(image):
    """
    Compute the mean gradient of a color image using OpenCV.
    
    Parameters:
    - image: The color image file.
    
    Returns:
    - mean_gradient: The mean gradient value of the image.
    """
    
    # Convert the image to grayscale
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Compute the gradient in the x and y directions
    gradient_x = cv2.Sobel(gray_image, cv2.CV_64F, 1, 0, ksize=3)
    gradient_y = cv2.Sobel(gray_image, cv2.CV_64F, 0, 1, ksize=3)
    
    # Compute the magnitude of the gradient
    gradient_magnitude = cv2.magnitude(gradient_x, gradient_y)
    
    # Compute the mean gradient
    mean_gradient = np.mean(gradient_magnitude)
    
    return round(mean_gradient,3)

def calculate_entropy(color_img):
    """计算彩色图像的信息熵。

    Parameters
    ----------
    color_img : numpy.ndarray
        输入的OpenCV彩色图像数据。

    Returns
    -------
    entropy : float
        图像的信息熵。
    """
    # 确保图像是彩色图像
    if len(color_img.shape) != 3 or color_img.shape[2] != 3:
        raise ValueError("Input image is not a valid color image.")
    
    # 将彩色图像转换为灰度图像
    gray_img = cv2.cvtColor(color_img, cv2.COLOR_BGR2GRAY)
    
    # 计算每个灰度值出现的概率
    hist = cv2.calcHist([gray_img], [0], None, [256], [0, 256])
    hist = hist.ravel()  # 将直方图展平
    hist = hist[hist > 0]  # 忽略没有出现的灰度值
    probabilities = hist / np.sum(hist)
    
    # 计算信息熵
    entropy = -np.sum(probabilities * np.log2(probabilities))
    
    return round(entropy,3)

# 读取中文路径图片
def cv_imread(filepath):
    cv_img = cv2.imdecode(np.fromfile(filepath,dtype=np.uint8),cv2.IMREAD_ANYCOLOR|cv2.IMREAD_ANYDEPTH)
    return cv_img

def load_checkpoint(checkpoint_dir,IsGPU):
    
	if IsGPU == 1:
		model_info = torch.load(checkpoint_dir + '/checkpoint.pth.tar')
		net = TOENet()
		device_ids = [0]
		model = nn.DataParallel(net, device_ids=device_ids).cuda()
		model.load_state_dict(model_info['state_dict'])
		optimizer = torch.optim.Adam(model.parameters())
		optimizer.load_state_dict(model_info['optimizer'])
		cur_epoch = model_info['epoch']
	else:

		model_info = torch.load(checkpoint_dir + '/checkpoint.pth.tar',map_location=torch.device('cpu'))
		net = TOENet()
		device_ids = [0]
		model = nn.DataParallel(net, device_ids=device_ids)
		model.load_state_dict(model_info['state_dict'])
		optimizer = torch.optim.Adam(model.parameters())
		optimizer.load_state_dict(model_info['optimizer'])
		cur_epoch = model_info['epoch']


	return model, optimizer,cur_epoch

def hwc_to_chw(img):
    return np.transpose(img, axes=[2, 0, 1])

def chw_to_hwc(img):
    return np.transpose(img, axes=[1, 2, 0])

def image_to_base64(image_path):
    with open(image_path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
    return encoded_string

def trans_dict(original_dict):
    # 获取原始字典中任意一个数组的长度，假设所有数组的长度都相同
    num_elements = len(next(iter(original_dict.values())))

    # 初始化新字典，键是原始字典的键，值是空列表
    new_dict = {f'new_key{i}': [] for i in range(num_elements)}

    # 遍历原始字典的值，即每个数组
    for values in original_dict.values():
        # 遍历数组中的每个元素及其索引
        for index, value in enumerate(values):
            # 将元素添加到新字典对应索引的列表中
            new_dict[f'new_key{index}'].append(value)
    return new_dict

def load_gan():
    METHOD = "DMPHN_1_2_4"
    if  torch.cuda.is_available():
        GPU = 0
        encoder_lv1 = Encoder().cuda(GPU)
        encoder_lv2 = Encoder().cuda(GPU)
        encoder_lv3 = Encoder().cuda(GPU)

        decoder_lv1 = Decoder().cuda(GPU)
        decoder_lv2 = Decoder().cuda(GPU)
        decoder_lv3 = Decoder().cuda(GPU)

        encoder_lv1.load_state_dict(torch.load(str('./weights/' + METHOD + "/encoder_lv1.pkl")))
        encoder_lv2.load_state_dict(torch.load(str('./weights/' + METHOD + "/encoder_lv2.pkl")))
        encoder_lv3.load_state_dict(torch.load(str('./weights/' + METHOD + "/encoder_lv3.pkl")))

        decoder_lv1.load_state_dict(torch.load(str('./weights/' + METHOD + "/decoder_lv1.pkl")))
        decoder_lv2.load_state_dict(torch.load(str('./weights/' + METHOD + "/decoder_lv2.pkl")))
        decoder_lv3.load_state_dict(torch.load(str('./weights/' + METHOD + "/decoder_lv3.pkl")))

        encoder_lv1 = encoder_lv1.cuda()
        encoder_lv2 = encoder_lv2.cuda()
        encoder_lv3 = encoder_lv3.cuda()

        decoder_lv1 = decoder_lv1.cuda()
        decoder_lv2 = decoder_lv2.cuda()
        decoder_lv3 = decoder_lv3.cuda()

    else:
        encoder_lv1 = Encoder()
        encoder_lv2 = Encoder()
        encoder_lv3 = Encoder()

        decoder_lv1 = Decoder()
        decoder_lv2 = Decoder()
        decoder_lv3 = Decoder()   


        encoder_lv1.load_state_dict(torch.load(str('./weights/' + METHOD + "/encoder_lv1.pkl"),map_location='cpu'))
        encoder_lv2.load_state_dict(torch.load(str('./weights/' + METHOD + "/encoder_lv2.pkl"),map_location='cpu'))
        encoder_lv3.load_state_dict(torch.load(str('./weights/' + METHOD + "/encoder_lv3.pkl"),map_location='cpu'))

        decoder_lv1.load_state_dict(torch.load(str('./weights/' + METHOD + "/decoder_lv1.pkl"),map_location='cpu'))
        decoder_lv2.load_state_dict(torch.load(str('./weights/' + METHOD + "/decoder_lv2.pkl"),map_location='cpu'))
        decoder_lv3.load_state_dict(torch.load(str('./weights/' + METHOD + "/decoder_lv3.pkl"),map_location='cpu'))

    total_params = 0
    total_params += sum(np.prod(p.size()) for p in encoder_lv1.parameters())
    total_params += sum(np.prod(p.size()) for p in encoder_lv2.parameters())
    total_params += sum(np.prod(p.size()) for p in encoder_lv3.parameters())
    total_params += sum(np.prod(p.size()) for p in decoder_lv1.parameters())
    total_params += sum(np.prod(p.size()) for p in decoder_lv2.parameters())
    total_params += sum(np.prod(p.size()) for p in decoder_lv3.parameters())

    return encoder_lv1,encoder_lv2,encoder_lv3,decoder_lv1,decoder_lv2,decoder_lv3,total_params

def pad_to_size(image, target_size):
    # 计算需要填充的像素数量
    pad_height = max(0, target_size[0] - image.size(2))
    pad_width = max(0, target_size[1] - image.size(3))
    
    # 创建填充张量
    pad_top = pad_height // 2
    pad_bottom = pad_height - pad_top
    pad_left = pad_width // 2
    pad_right = pad_width - pad_left
    padding = (pad_left, pad_right, pad_top, pad_bottom)

    return torch.nn.functional.pad(image, padding, "constant", 0)

def crop_to_original_size(padded_image, original_size):
    # 计算裁剪的起始和结束位置
    crop_height_start = (padded_image.size(2) - original_size[0]) // 2
    crop_height_end = crop_height_start + original_size[0]
    crop_width_start = (padded_image.size(3) - original_size[1]) // 2
    crop_width_end = crop_width_start + original_size[1]
    
    # 裁剪图像
    return padded_image[:, :, crop_height_start:crop_height_end, crop_width_start:crop_width_end]