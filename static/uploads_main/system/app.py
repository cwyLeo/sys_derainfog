import physical
import matplotlib.pyplot as plt
from flask import Flask, render_template, request, flash, redirect, url_for, make_response
from flask_bootstrap import Bootstrap
import os
import numpy as np
import cv2
from werkzeug.utils import secure_filename
import deeplearning
from utils import *
import re
import time

app = Flask(__name__)
bootstrap = Bootstrap(app)
app.config['SECRET_KEY'] = os.urandom(24)
 
basedir = os.path.abspath(os.path.dirname(__file__))
uploadHazyDir = os.path.join(basedir, 'static/uploads_hazy')
uploadGTDir = os.path.join(basedir, 'static/uploads_GT')
reusltDir = os.path.join(basedir,'static/results')
 
 
@app.route('/', methods=['POST', 'GET'])
def process():
    if request.method == 'POST':
        f_ori = request.files['selectfile']
        f_gt = request.files['selectfile2']
        if not os.path.exists(uploadHazyDir):
            os.makedirs(uploadHazyDir)
        if not os.path.exists(uploadGTDir):
            os.makedirs(uploadGTDir)
        if f_ori.filename != '':
            filename = secure_filename(f_ori.filename)
            types = ['jpg', 'png', 'tif']
            if filename.lower().split('.')[-1] in types:
                uploadpath = os.path.join(uploadHazyDir, filename)
                f_ori.save(uploadpath)
                image = cv_imread(uploadpath)
                if f_gt.filename != '':
                    filenameGT = secure_filename(f_gt.filename)
                    if filenameGT.lower().split('.')[-1] in types:
                        uploadpathGT = os.path.join(uploadGTDir, filenameGT)
                        f_gt.save(uploadpathGT)
                        imageGT = cv_imread(uploadpathGT)
                        value_psnr = calculate_psnr(image,imageGT)
                        value_ssim = calculate_ssim(imageGT,image)
                        value_mg = calculate_mg(image)
                        value_en = calculate_entropy(image)
                        value_psnr_gt = calculate_psnr(imageGT,imageGT)
                        value_ssim_gt = calculate_ssim(imageGT,imageGT)
                        value_mg_gt = calculate_mg(imageGT)
                        value_en_gt = calculate_entropy(imageGT)
                        image_list = [
                            {'name':'origin','filename':filename,'scores':{'PSNR':value_psnr,'SSIM':value_ssim,'MG':value_mg,'Entropy':value_en}},
                            {'name':'ground_truth','filename':filenameGT,'scores':{'PSNR':value_psnr_gt,'SSIM':value_ssim_gt,'MG':value_mg_gt,'Entropy':value_en_gt}}
                        ]
                        entropy = [calculate_entropy(image),calculate_entropy(imageGT)]
                        mg = [calculate_mg(image),calculate_mg(imageGT)]
                        complexities = [0,0]
                        time_used = [0,0]
                        psnr = [value_psnr,value_psnr_gt]
                        ssim = [value_ssim,value_ssim_gt]
                        keys = ['ori','gt']
                    else:
                        flash('Unknown Types!', 'danger')
                else:
                    image_list = [
                        {'name':'origin','filename':filename,'scores':{'MG':calculate_mg(image),'Entropy':calculate_entropy(image)}}
                    ]
                    entropy = [calculate_entropy(image)]
                    mg = [calculate_mg(image)]
                    complexities = [0]
                    time_used = [0]
                    keys = ['ori']
                modules = dir(physical) + dir(deeplearning)
                for mod in modules:
                    if re.findall(r'\_image$',mod):
                        if mod in dir(physical):
                            func = getattr(physical,mod)
                        # elif 'DCP' in mod and f_gt.filename != '':
                        #     continue
                        else:
                            func = getattr(deeplearning,mod)
                        time_begin = time.time()
                        output,complexity = func(image,uploadpath)
                        if isinstance(output,list) or isinstance(output,tuple):
                            output = output[0]
                            complexity = output[1]
                        time_end = time.time()
                        tmp = filename.split('.')[0]
                        tmp2 = filename.split('.')[-1]
                        filename2 = f'{tmp}{mod}.{tmp2}'
                        deep_path = os.path.join(reusltDir,filename2)
                        with open(deep_path,'wb') as f:
                            tmp3 = filename.split('.')[-1]
                            f.write(cv2.imencode(f'.{tmp3}',output)[1].tobytes())
                        value_mg = calculate_mg(output)
                        value_en = calculate_entropy(output)
                        entropy.append(value_en)
                        mg.append(value_mg)
                        complexities.append(complexity)
                        time_used.append(round(time_end - time_begin,3))
                        keys.append(mod)
                        if f_gt.filename != '':
                            value_psnr = calculate_psnr(imageGT,output)
                            value_ssim = calculate_ssim(imageGT,output)
                            psnr.append(value_psnr)
                            ssim.append(value_ssim)
                            image_list.append({'name':mod,'filename':filename2,'scores':{'PSNR':value_psnr,'SSIM':value_ssim,'MG':value_mg,'Entropy':value_en,'time':round(time_end - time_begin,3),'complexity':complexity}})
                        else:
                            image_list.append({'name':mod,'filename':filename2,'scores':{'MG':value_mg,'Entropy':value_en,'time':round(time_end - time_begin,3),'complexity':complexity}})
                plt.figure(figsize=(16, 8))  # 设置图表大小
                plt.plot(keys, entropy, marker='o',label='entropy')  # 使用点标记每个数据点
                plt.xlabel('Keys')  # x轴标签
                plt.ylabel('Values')  # y轴标签
                plt.title('Entropy')  # 图表标题
                plt.grid(True)  # 显示网格
                plt.savefig(os.path.join(reusltDir,'entropy.png'), dpi=720, bbox_inches='tight')

                plt.figure(figsize=(16, 8))  # 设置图表大小
                plt.plot(keys, mg, marker='o', label='mg')
                plt.xlabel('Keys')  # x轴标签
                plt.ylabel('Values')  # y轴标签
                plt.title('MG')  # 图表标题
                plt.grid(True)  # 显示网格
                plt.savefig(os.path.join(reusltDir,'mg.png'), dpi=720, bbox_inches='tight')

                plt.figure(figsize=(16, 8))  # 设置图表大小
                plt.plot(keys, complexities, marker='o', label='complexity')
                plt.xlabel('Keys')  # x轴标签
                plt.ylabel('Values')  # y轴标签
                plt.title('Complexities')  # 图表标题
                plt.grid(True)  # 显示网格
                plt.savefig(os.path.join(reusltDir,'complexities.png'), dpi=720, bbox_inches='tight')

                plt.figure(figsize=(16, 8))  # 设置图表大小
                plt.plot(keys, time_used, marker='o', label='time')
                plt.xlabel('Keys')  # x轴标签
                plt.ylabel('Values')  # y轴标签
                plt.title('Times')  # 图表标题
                plt.grid(True)  # 显示网格
                plt.savefig(os.path.join(reusltDir,'times.png'), dpi=720, bbox_inches='tight')
                if f_gt.filename != '':
                    plt.figure(figsize=(16, 8))  # 设置图表大小
                    plt.plot(keys, psnr, marker='o',label='psnr')  # 使用点标记每个数据点
                    plt.xlabel('Keys')  # x轴标签
                    plt.ylabel('Values')  # y轴标签
                    plt.title('PSNR')  # 图表标题
                    plt.grid(True)  # 显示网格
                    plt.savefig(os.path.join(reusltDir,'psnr.png'), dpi=720, bbox_inches='tight')

                    plt.figure(figsize=(16, 8))  # 设置图表大小
                    plt.plot(keys, ssim, marker='o', label='ssim')
                    plt.xlabel('Keys')  # x轴标签
                    plt.ylabel('Values')  # y轴标签
                    plt.title('SSIM')  # 图表标题
                    plt.grid(True)  # 显示网格
                    plt.savefig(os.path.join(reusltDir,'ssim.png'), dpi=720, bbox_inches='tight')                    
                flash('Upload Load Successful!', 'success')
                return render_template('base.html', image_list=image_list, uploads_num = f_gt.filename)
            else:
                flash('Unknown Types!', 'danger')
        else:
            flash('No File Selected.', 'danger')
    return render_template('base.html')

 
if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5000,debug=True)