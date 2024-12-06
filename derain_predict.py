#PyTorch lib
import torch
import torch.nn as nn
from torch.autograd import Variable
import torch.utils.data as Data
import torch.nn.functional as F
import torchvision
#Tools lib
import numpy as np
import cv2
import random
import time
import os
import argparse
#Models lib
from models import *
#Metrics lib
# from metrics import calc_psnr, calc_ssim

def align_to_four(img):
    #print ('before alignment, row = %d, col = %d'%(img.shape[0], img.shape[1]))
    #align to four
    a_row = int(img.shape[0]/4)*4
    a_col = int(img.shape[1]/4)*4
    img = img[0:a_row, 0:a_col]
    #print ('after alignment, row = %d, col = %d'%(img.shape[0], img.shape[1]))
    return img


def predict(model,image):
    image = np.array(image, dtype='float32')/255.
    image = image.transpose((2, 0, 1))
    image = image[np.newaxis, :, :, :]
    image = torch.from_numpy(image)
    if torch.cuda.is_available():
        image = Variable(image).cuda()
    else:
        image = Variable(image)

    out = model(image)[-1]

    out = out.cpu().data
    out = out.numpy()
    out = out.transpose((0, 2, 3, 1))
    out = out[0, :, :, :]*255.
    
    return out


def gan_image(images,a):
    results = []
    if torch.cuda.is_available():
        model = Generator().cuda()
        model.load_state_dict(torch.load('./weights/gen.pkl'))
    else:
        model = Generator()
        model.load_state_dict(torch.load('./weights/gen.pkl',map_location='cpu'))
    total_params = sum(np.prod(p.size()) for p in model.parameters())
    for image in images:
        img = align_to_four(image)
        result = predict(model,img)
        result = np.array(result, dtype = 'uint8')
        results.append(result)
        # input_list = sorted(os.listdir(args.input_dir))
        # gt_list = sorted(os.listdir(args.gt_dir))
        # num = len(input_list)
        # cumulative_psnr = 0
        # cumulative_ssim = 0
        # for i in range(num):
        #     print ('Processing image: %s'%(input_list[i]))
        #     img = cv2.imread(args.input_dir + input_list[i])
        #     img = align_to_four(img)
        #     result = predict(img)
        #     result = np.array(result, dtype = 'uint8')
    return results,total_params
