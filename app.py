import physical
import matplotlib.pyplot as plt
from flask import Flask, render_template, request, flash, redirect, url_for, make_response, send_from_directory, abort, render_template_string,jsonify,send_file
from flask_bootstrap import Bootstrap
import os
import numpy as np
import cv2
from werkzeug.utils import secure_filename
import zipfile
import deeplearning
from utils import *
import re
import time
from mimetypes import guess_type
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
import subprocess
import json
import derain_predict
import webbrowser


app = Flask(__name__)
bootstrap = Bootstrap(app)
app.config['SECRET_KEY'] = os.urandom(24)
app.config['UPLOAD_FOLDER'] = 'static/uploads_main'
app.config['ALLOWED_EXTENSIONS'] = {'zip'}

def allowed_zip(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']
 
basedir = os.path.abspath(os.path.dirname(__file__))
uploadHazyDir = os.path.join(basedir, 'static/uploads_hazy')
uploadGTDir = os.path.join(basedir, 'static/uploads_GT')
reusltDir = os.path.join(basedir,'static/results')
uploadDir = os.path.join(basedir,'static/uploads_main')
pdfDir = os.path.join(basedir,'static')


def create_pdf_with_images(a,b,combined_list, output_filename):
    c = canvas.Canvas(os.path.join(uploadDir,output_filename), pagesize=letter)
    page_width, page_height = letter
    num_columns = len(combined_list)  # 图片列数
    spacing = 10  # 图片之间的间隔
    total_spacing = (num_columns - 1) * spacing  # 总间隔宽度
    max_width_per_image = (page_width - total_spacing - 20) / num_columns  # 考虑间隔后每张图片的最大宽度
    start_x = 10  # 图片的起始x坐标
    # 在顶部添加标题
    title = 'Optimize image visualization'
    c.setFont("Helvetica-Bold", 16)  # 设置标题字体和大小
    title_width = c.stringWidth(title, "Helvetica-Bold", 16)
    title_x = (page_width - title_width) / 2  # 计算标题的x坐标，使其居中
    title_y = page_height - 20  # 设置标题的y坐标
    c.drawString(title_x, title_y, title)  # 绘制标题
    new_combined_list = trans_dict(combined_list)
    key_list = []
    for col_index, (key, image_paths) in enumerate(combined_list.items()):
        key_list.append(key)
        path_num = len(image_paths)
        total_spacing_h = (num_columns - 1) * spacing
        max_height_per_image = (page_height - total_spacing_h - 100) / path_num
        img = Image.open(image_paths[0])
        original_width, original_height = img.size
        scale = min(max_width_per_image / original_width, 1)
        # scale = min(scale, max_height_per_image / original_height)
        # 计算缩放后的图片尺寸
        scaled_width = original_width * scale
        scaled_height = original_height * scale
        # 计算图片的缩放比例

        # 在每列顶部绘制key名
        c.setFont("Helvetica", 12)  # 设置字体和大小
        text_width = c.stringWidth(key, "Helvetica", 12)  # 计算文本宽度
        tmp_x = (page_width - len(combined_list) * (scaled_width + spacing) + spacing) / 2
        text_x = tmp_x + col_index * (scaled_width + spacing) + (max_width_per_image - text_width) / 2
        text_y = title_y - 20  # 20是文本距离页面顶部的距离
        c.drawString(text_x, text_y, key)  # 绘制居中的文本

        # 更新列的y坐标以考虑文本高度
        text_height = 12  # 假设文本高度为字体大小
        title_height = 16
        y = page_height - 20 - text_height - title_height - spacing  # 更新y坐标以留出文本空间
        j = 0
    for col_index,(key,image_paths) in enumerate(new_combined_list.items()):
        img = Image.open(image_paths[0])
        original_width, original_height = img.size
        scale = min(max_width_per_image / original_width, 1)
        y = y - original_height * scale - spacing
        if y < 0:
            c.showPage()
            c.setFont("Helvetica", 12)  # 设置字体和大小
            for i,key in enumerate(key_list):
                text_width = c.stringWidth(key, "Helvetica", 12)  # 计算文本宽度
                tmp_x = (page_width - len(combined_list) * (scaled_width + spacing) + spacing) / 2
                text_x = tmp_x + i * (scaled_width + spacing) + (max_width_per_image - text_width) / 2
                text_y = page_height - 20  # 20是文本距离页面顶部的距离
                c.drawString(text_x, text_y, key)  # 绘制居中的文本
            y = page_height - 20 - scale * original_height - 16 - spacing
        for row_index,image_path in enumerate(image_paths):
            img = Image.open(image_path)
            original_width, original_height = img.size
            scale = min(max_width_per_image / original_width, 1)
            # scale = min(scale, max_height_per_image / original_height)
            # 计算缩放后的图片尺寸
            scaled_width = original_width * scale
            scaled_height = original_height * scale  
            # 计算图片的x坐标
            tmp_x = (page_width - len(combined_list) * (scaled_width + spacing) + spacing) / 2
            x = tmp_x + row_index * (scaled_width + spacing)

            # 计算图片的y坐标（这里简单地放在页面顶部，可根据需要调整）
            # y = y - original_height * scale - spacing  # 留出底部空间


            # 如果图片x坐标加上图片宽度加上间隔超过页面宽度，则跳到下一页
            if x + scaled_width > page_width:
                c.showPage()
                x = start_x + j * (scaled_width + spacing)
                y = page_height - 20 - text_height - spacing  # 重置y坐标
                c.setFont("Helvetica", 12)  # 设置字体和大小
                text_width = c.stringWidth(key, "Helvetica", 12)  # 计算文本宽度
                text_x = x + (max_width_per_image - text_width) / 2  # 计算文本的x坐标以居中
                text_y = page_height - 20  # 20是文本距离页面顶部的距离
                c.drawString(text_x, text_y, key)  # 绘制居中的文本
                y -= scaled_height + spacing  # 更新y坐标以留出文本空间
                j = 0
            else:
                j += 1

            # 绘制图片
            c.drawImage(image_path, x, y, width=scaled_width, height=scaled_height)
    # c.showPage()
    title2 = 'Measurement visualization'
    if y - 20 < 0:
        c.showPage()
        title_y2 = page_height - 20
    else:
        title_y2 = y - 50 - spacing
    c.setFont("Helvetica-Bold", 16)  # 设置标题字体和大小
    title_width2 = c.stringWidth(title2, "Helvetica-Bold", 16)
    title_x2 = (page_width - title_width2) / 2  # 计算标题的x坐标，使其居中
    # title_y2 = page_height - text_height - title_height - (path_num + 1) * (original_height * scale + spacing) - 20  # 设置标题的y坐标
    c.drawString(title_x2, title_y2, title2)  # 绘制标题
    width,height = page_width,page_height
    spacing = 50  # 图片之间的间隔
    image_width = 200
    image_height = 200
    start_x = (width - len(image_paths) * (image_width + spacing) + spacing) / 2
    # start_y = height - image_height - 50  # 留出底部空间
    # start_y = page_height - text_height - title_height - (path_num + 1) * (original_height * scale + spacing) - 90
    start_y = title_y2 - 50
    image_paths = a
    i = 1
    scale = 0.05
    for image_path in image_paths:
        img = ImageReader(image_path)
        image_width,image_height = img.getSize()
        # 计算当前图片的 x 坐标
        x = (width - image_width * scale) / 2
        y = start_y - i * (image_height * scale + spacing)
        if i == 1:
            y = start_y - image_height * scale
        if y + spacing < 0 and i != 1 or y < 0:
            c.showPage()
            start_y = height - 50
            y = start_y - image_height * scale
            i = 1
        i += 1
        c.drawImage(image_path, x, y, width=image_width*scale, height=image_height*scale)
    c.save()
    return send_file('static/uploads_main/'+output_filename,as_attachment=True)

@app.route('/pdf/<filename>')
def pdf_file(filename):
    return send_from_directory('static', filename, as_attachment=True)
 
@app.route('/', methods=['POST', 'GET'])
def process():
    if request.method == 'POST':
        f_ori = request.files['selectfile']
        f_gt = request.files['selectfile2']
        image_action = request.form.get('imageAction')
        alg_list = []
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
                        value_en,value_mg,value_psnr,value_ssim = calculate_metrics(image,imageGT)
                        value_en_gt,value_mg_gt,value_psnr_gt,value_ssim_gt = calculate_metrics(imageGT,imageGT)
                        image_list = [
                            {'name':'origin','filename':filename,'scores':{'PSNR':value_psnr,'SSIM':value_ssim,'MG':value_mg,'Entropy':value_en}},
                            {'name':'ground_truth','filename':filenameGT,'scores':{'PSNR':value_psnr_gt,'SSIM':value_ssim_gt,'MG':value_mg_gt,'Entropy':value_en_gt}}
                        ]
                        entropy = [value_en,value_en_gt]
                        mg = [value_mg,value_mg_gt]
                        complexities = [0,0]
                        time_used = [0,0]
                        psnr = [value_psnr,value_psnr_gt]
                        ssim = [value_ssim,value_ssim_gt]
                        keys = ['ori','gt']
                        pjs = {'psnr':psnr,'ssim':ssim,'entropy':entropy,'mg':mg,'time_used':time_used,'complexity':complexities}
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
                    pjs = {'entropy':entropy,'mg':mg,'time_used':time_used,'complexity':complexities}
                modules = dir(physical) + dir(deeplearning)
                if image_action == 'derain':
                    modules = dir(derain_predict)
                # modules = dir(physical)
                for mod in modules:
                    if re.findall(r'\_image$',mod):
                        if image_action == 'defog':
                            if mod in dir(physical):
                                func = getattr(physical,mod)
                            # elif 'DCP' in mod and f_gt.filename != '':
                            #     continue
                            else:
                                func = getattr(deeplearning,mod)
                        else:
                            func = getattr(derain_predict,mod)
                        time_begin = time.time()
                        output,complexity = func([image],[uploadpath])
                        if isinstance(output,list) or isinstance(output,tuple):
                            new_output = output[0]
                            if len(output) == 2:
                                complexity = output[1]
                            output = new_output
                        time_end = time.time()
                        tmp = filename.split('.')[0]
                        tmp2 = filename.split('.')[-1]
                        filename2 = f'{tmp}{mod}.{tmp2}'
                        deep_path = os.path.join(reusltDir,filename2)
                        if torch.is_tensor(output):
                            torchvision.utils.save_image(output,deep_path)
                        else:
                            with open(deep_path,'wb') as f:
                                tmp3 = filename.split('.')[-1]
                                f.write(cv2.imencode(f'.{tmp3}',output)[1].tobytes())
                        output = cv_imread(deep_path)
                        value_mg,value_en = calculate_metrics(output)
                        pjs['entropy'].append(value_en)
                        pjs['mg'].append(value_mg)
                        pjs['complexity'].append(complexity)
                        pjs['time_used'].append(round(time_end - time_begin,3))
                        keys.append(mod)
                        alg_list.append(re.split(r'_image',mod)[0])
                        if f_gt.filename != '':
                            _,_,value_psnr,value_ssim = calculate_metrics(imageGT,output)
                            pjs['psnr'].append(value_psnr)
                            pjs['ssim'].append(value_ssim)
                            image_list.append({'name':mod,'filename':filename2,'scores':{'PSNR':value_psnr,'SSIM':value_ssim,'MG':value_mg,'Entropy':value_en,'time':round(time_end - time_begin,3),'complexity':complexity}})
                        else:
                            image_list.append({'name':mod,'filename':filename2,'scores':{'MG':value_mg,'Entropy':value_en,'time':round(time_end - time_begin,3),'complexity':complexity}})
                for key,value in pjs.items():
                    plt.figure(figsize=(20, 10))  # 设置图表大小
                    plt.plot(keys, value, marker='o',label='entropy')  # 使用点标记每个数据点
                    plt.xlabel('Keys')  # x轴标签
                    plt.ylabel('Values')  # y轴标签
                    plt.title(key)  # 图表标题
                    plt.grid(True)  # 显示网格
                    plt.savefig(os.path.join(reusltDir,f'{key}.png'), dpi=720, bbox_inches='tight')
                  
                flash('Upload Load Successful!', 'success')
                return render_template('base.html', image_list=image_list, uploads_num = f_gt.filename,alg_list=alg_list, type=0)
            else:
                flash('Unknown Types!', 'danger')
        else:
            flash('No File Selected.', 'danger')
    return render_template('base.html')

@app.route('/index',methods=['POST'])
def index():
    types = ['jpg', 'png', 'tif']
    image_folder = request.form.get('filename')
    items = request.form.get('items')
    image_action = request.form.get('imageAction')
    items = json.loads(items)
    path = request.form.get('path')
    parent_path = request.form.get('parent_path')
    folder_path = image_folder.replace('\\', '/')
    image_folder = os.path.abspath(os.path.join(uploadDir, folder_path))
    if image_folder:
        # 获取图片文件夹路径
        # image_folder = request.form.get('image_folder')
        ground_truth_folder = request.form.get('ground_truth_folder')

        # 检查文件夹是否存在
        if not os.path.exists(image_folder):
            flash(f'Image folder "{image_folder.split('\\')[-1]}" not found.', 'danger')
            return redirect(url_for('browse'))
        elif not os.path.isdir(image_folder) and image_folder.lower().split('.')[-1] in types:
            processed_image_list,pjs,combined_list = process_image(image_folder,image_action)

            create_pdf_with_images(a=processed_image_list,b=pjs,combined_list=combined_list,output_filename='test.pdf')
            # subprocess.Popen(os.path.join(uploadDir,"test.pdf"), shell=True)
            webbrowser.open(os.path.join(uploadDir,"test.pdf"))
        else:
            files = os.listdir(image_folder)
            if len(files) == 2 and 'gt' in files and 'hazy' in files:
                process_image
            processed_image_list,pjs,combined_list = process_image(image_folder,image_action)

            create_pdf_with_images(a=processed_image_list,b=pjs,combined_list=combined_list,output_filename='test.pdf')
            # subprocess.Popen(os.path.join(uploadDir,"test.pdf"), shell=True)
            webbrowser.open(os.path.join(uploadDir,"test.pdf"))
    # return response
    # pdf_url = url_for('create_pdf_with_images')
    flash(f'{image_folder.split('\\')[-1]} successfully completed!','success')
    flash(f'<a href="test.pdf">download pdf</a>','info')
    return render_template('browse.html',items=items, path=path, parent_path=parent_path)

def process_image(image_folder,image_action,gt_path=''):
    alg_list = []
    input_image_list = []
    uploadpaths = []
    output_image_list = []
    pjs = {}
    keys = {}
    filenames = []
    combined_list = {'ori':[]}
    if os.path.isdir(image_folder):
        filenames = os.listdir(image_folder)
        if filenames[0] in ['gt','hazy'] and os.path.isdir(os.path.join(image_folder,filenames[0])):
            image_folder = os.path.join(image_folder,'hazy')
            gt_path = os.path.join(image_folder,'gt')
            filenames = os.listdir(image_folder)
    else:
        filenames = [image_folder]
    for image_filename in filenames:
        if os.path.isdir(image_folder):
            filename = os.path.join(image_folder, image_filename)
        else:
            filename = image_filename
        combined_list['ori'].append(filename)
        types = ['jpg', 'png', 'tif']
        if filename.lower().split('.')[-1] in types or os.path.isdir(filename):
            uploadpath = filename
            uploadpaths.append(uploadpath)
            image = cv_imread(uploadpath)
            input_image_list.append(image)
            if gt_path != '':
                filenameGT = secure_filename(os.path.join(gt_path,image_filename))
                if image_filename in os.listdir(gt_path):
                        uploadpathGT = filenameGT
                        imageGT = cv_imread(uploadpathGT)
                        value_en,value_mg,value_psnr,value_ssim = calculate_metrics(image,imageGT)
                        value_en_gt,value_mg_gt,value_psnr_gt,value_ssim_gt = calculate_metrics(imageGT,imageGT)
                        image_list = [
                            {'name':'origin','filename':filename,'scores':{'PSNR':value_psnr,'SSIM':value_ssim,'MG':value_mg,'Entropy':value_en}},
                            {'name':'ground_truth','filename':filenameGT,'scores':{'PSNR':value_psnr_gt,'SSIM':value_ssim_gt,'MG':value_mg_gt,'Entropy':value_en_gt}}
                        ]
                        entropy = [value_en,value_en_gt]
                        mg = [value_mg,value_mg_gt]
                        complexities = [0,0]
                        time_used = [0,0]
                        psnr = [value_psnr,value_psnr_gt]
                        ssim = [value_ssim,value_ssim_gt]
                        keys = ['ori','gt']
                        pjs = {'psnr':psnr,'ssim':ssim,'entropy':entropy,'mg':mg,'time_used':time_used,'complexity':complexities}
                else:
                        flash('Unknown Types!', 'danger')
            else:
                    entropy = [calculate_entropy(image)]
                    mg = [calculate_mg(image)]
                    complexities = [0]
                    time_used = [0]
                    keys = ['ori']
                    pjs = {'entropy':entropy,'mg':mg,'time_used':time_used,'complexity':complexities}
    modules = dir(physical) + dir(deeplearning)
    # modules = dir(physical)
    if image_action == 'derain':
        modules = dir(derain_predict)
    for mod in modules:
        if re.findall(r'\_image$',mod):
            combined_list[mod] = []
            if image_action == 'defog':
                if mod in dir(physical):
                    func = getattr(physical,mod)
                else:
                    func = getattr(deeplearning,mod)
                    # continue
                    a = 1
            else:
                func = getattr(derain_predict,mod)
            print(mod)
            time_begin = time.time()
            outputs,complexity = func(input_image_list,uploadpaths)
            output_image_list.append(outputs)
            time_end = time.time()
            value_mg = 0
            value_en = 0
            value_psnr = 0
            value_ssim = 0
            for index,output in enumerate(outputs):
                tmp = filenames[index].split('.')[0].split('\\')[-1]
                tmp2 = filenames[index].split('.')[-1]
                filename2 = f'{tmp}_{mod}.{tmp2}'
                deep_path = os.path.join(reusltDir,filename2)
                if torch.is_tensor(output):
                    torchvision.utils.save_image(output,deep_path)
                else:
                    with open(deep_path,'wb') as f:
                        tmp3 = filenames[index].split('.')[-1]
                        f.write(cv2.imencode(f'.{tmp3}',output)[1].tobytes())
                output = cv_imread(deep_path)
                combined_list[mod].append(deep_path)
                value_mg += calculate_mg(output)
                value_en += calculate_entropy(output)
                if gt_path != '':
                    value_psnr += calculate_psnr(imageGT,output)
                    value_ssim += calculate_ssim(imageGT,output)
            pjs['entropy'].append(value_en/len(outputs))
            pjs['mg'].append(value_mg/len(outputs))
            pjs['complexity'].append(complexity)
            pjs['time_used'].append(round(time_end - time_begin,3))
            if gt_path != '':
                pjs['psnr'].append(value_psnr/len(outputs))
                pjs['ssim'].append(value_ssim/len(outputs))
            keys.append(mod)
            alg_list.append(re.split(r'_image',mod)[0])
            # if gt_path != '':
            #     value_psnr = calculate_psnr(imageGT,output)
            #     value_ssim = calculate_ssim(imageGT,output)
            #     pjs['psnr'].append(value_psnr)
            #     pjs['ssim'].append(value_ssim)
            #     image_list.append({'name':mod,'filename':filename2,'scores':{'PSNR':value_psnr,'SSIM':value_ssim,'MG':value_mg,'Entropy':value_en,'time':round(time_end - time_begin,3),'complexity':complexity}})
            # else:
            #     image_list.append({'name':mod,'filename':filename2,'scores':{'MG':value_mg,'Entropy':value_en,'time':round(time_end - time_begin,3),'complexity':complexity}})
    path_list = []
    for key,value in pjs.items():
        plt.figure(figsize=(15, 5))  # 设置图表大小
        plt.plot(keys, value, marker='o')  # 使用点标记每个数据点
        plt.xticks(fontsize=14)
        plt.xlabel('Keys')  # x轴标签
        plt.ylabel('Values')  # y轴标签
        plt.title(key,fontsize=16)  # 图表标题
        plt.grid(True)  # 显示网格
        plt.savefig(os.path.join(reusltDir,f'{key}.png'), dpi=720, bbox_inches='tight')
        path_list.append(os.path.join(reusltDir,f'{key}.png'))

    return path_list,pjs,combined_list
 
@app.route('/upload', methods=['POST'])
def upload_zip():
    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])
    if 'file' not in request.files:
        return '没有文件部分'
    file = request.files['file']
    if file.filename == '':
        return '没有选择文件'
    if file:
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        
        # 解压文件
        if allowed_zip(file.filename):
            with zipfile.ZipFile(file_path, 'r') as zip_ref:
                zip_ref.extractall(app.config['UPLOAD_FOLDER'])
            os.remove(file_path)
            return browse()
        return browse()
    return browse()

@app.route('/browse')
@app.route('/browse/')
@app.route('/browse/<path:path>')
def browse(path='.'):
    path = path.replace('\\', '/')
    full_path = os.path.abspath(os.path.join(uploadDir, path))
    if full_path.endswith('.pdf'):
        webbrowser.open(full_path)
        return browse('.')
    # 安全检查，确保路径在允许的目录下
    # if not full_path.startswith(base_path):
        # abort(403)

    items = []
    for item in os.listdir(full_path):
        item_path = os.path.join(path, item)
        item_path = item_path.replace('\\', '/')
        full_item_path = os.path.join(uploadDir, item_path)
        is_dir = os.path.isdir(full_item_path)
        mime_type = ''

        # 如果不是目录，尝试获取文件的MIME类型
        if not is_dir:
            mime_type, _ = guess_type(full_item_path)
        if mime_type is None:
            mime_type = ''
        items.append({
            'name': item,
            'path': item_path,
            'is_dir': is_dir,
            'mime_type': mime_type  # 添加MIME类型属性
        })

    parent_path = os.path.dirname(path) if path != '.' else path

    return render_template('browse.html', items=items, path=path, parent_path=parent_path)


@app.route('/download/<path:path>')
def download(path):
    full_path = os.path.abspath(os.path.join(uploadDir, path))
    # if not full_path.startswith('D:/cwy/college/study/shuoshi/lab/system/system/static'):
        # return 'Invalid path', 403
    path = path.replace('\\', '/')
    return send_from_directory(uploadDir+'/', path, as_attachment=True)

@app.route('/alg_list')
def toalg():
    defog_alg_list = []
    derain_alg_list = []
    modules = dir(physical) + dir(deeplearning)
    for mod in modules:
        if re.findall(r'\_image$',mod):
            defog_alg_list.append(mod)
    modules = dir(derain_predict)
    for mod in modules:
        if re.findall(r'_image$',mod):
            derain_alg_list.append(mod)
    return render_template('alg_list.html',defog_alg_list=defog_alg_list,derain_alg_list=derain_alg_list)

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5000,debug=True)