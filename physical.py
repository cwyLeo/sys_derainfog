# 图像增强算法，图像锐化算法
# 1）基于直方图均衡化 2）基于拉普拉斯算子 3）基于对数变换 4）基于伽马变换 5)CLAHE 6)retinex-SSR 7)retinex-MSR
# 其中，基于拉普拉斯算子的图像增强为利用空域卷积运算实现滤波
# 基于同一图像对比增强效果
# 直方图均衡化:对比度较低的图像适合使用直方图均衡化方法来增强图像细节
# 拉普拉斯算子可以增强局部的图像对比度
# log对数变换对于整体对比度偏低并且灰度值偏低的图像增强效果较好
# 伽马变换对于图像对比度偏低，并且整体亮度值偏高（对于相机过曝）情况下的图像增强效果明显

import cv2
import numpy as np
import matplotlib.pyplot as plt


# 直方图均衡增强
def hist(image):
    r, g, b = cv2.split(image)
    r1 = cv2.equalizeHist(r)
    g1 = cv2.equalizeHist(g)
    b1 = cv2.equalizeHist(b)
    image_equal_clo = cv2.merge([r1, g1, b1])
    return image_equal_clo


# 拉普拉斯算子
def laplacian(image):
    kernel = np.array([[0, -1, 0], [-1, 5, -1], [0, -1, 0]])
    image_lap = cv2.filter2D(image, cv2.CV_8UC3, kernel)
    return image_lap


# 对数变换
def log(image):
    image_log = np.uint8(np.log(np.array(image) + 1))
    cv2.normalize(image_log, image_log, 0, 255, cv2.NORM_MINMAX)
    # 转换成8bit图像显示
    cv2.convertScaleAbs(image_log, image_log)
    return image_log


# 伽马变换
def gamma(image):
    fgamma = 2
    image_gamma = np.uint8(np.power((np.array(image) / 255.0), fgamma) * 255.0)
    cv2.normalize(image_gamma, image_gamma, 0, 255, cv2.NORM_MINMAX)
    cv2.convertScaleAbs(image_gamma, image_gamma)
    return image_gamma


# 限制对比度自适应直方图均衡化CLAHE
def clahe(image):
    b, g, r = cv2.split(image)
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    b = clahe.apply(b)
    g = clahe.apply(g)
    r = clahe.apply(r)
    image_clahe = cv2.merge([b, g, r])
    return image_clahe


def replaceZeroes(data):
    min_nonzero = min(data[np.nonzero(data)])
    data[data == 0] = min_nonzero
    return data


# retinex SSR
def SSR(src_img, size):
    L_blur = cv2.GaussianBlur(src_img, (size, size), 0)
    img = replaceZeroes(src_img)
    L_blur = replaceZeroes(L_blur)

    dst_Img = cv2.log(img/255.0)
    dst_Lblur = cv2.log(L_blur/255.0)
    dst_IxL = cv2.multiply(dst_Img, dst_Lblur)
    log_R = cv2.subtract(dst_Img, dst_IxL)

    dst_R = cv2.normalize(log_R,None, 0, 255, cv2.NORM_MINMAX)
    log_uint8 = cv2.convertScaleAbs(dst_R)
    return log_uint8


def SSR_image(images,a):
    results = []
    for image in images:
        size = 3
        b_gray, g_gray, r_gray = cv2.split(image)
        b_gray = SSR(b_gray, size)
        g_gray = SSR(g_gray, size)
        r_gray = SSR(r_gray, size)
        results.append(cv2.merge([b_gray, g_gray, r_gray]))
    return results,0


# retinex MMR
def MSR(img, scales):
    weight = 1 / 3.0
    scales_size = len(scales)
    h, w = img.shape[:2]
    log_R = np.zeros((h, w), dtype=np.float32)

    for i in range(scales_size):
        img = replaceZeroes(img)
        L_blur = cv2.GaussianBlur(img, (scales[i], scales[i]), 0)
        L_blur = replaceZeroes(L_blur)
        dst_Img = cv2.log(img/255.0)
        dst_Lblur = cv2.log(L_blur/255.0)
        dst_Ixl = cv2.multiply(dst_Img, dst_Lblur)
        log_R += weight * cv2.subtract(dst_Img, dst_Ixl)

    dst_R = cv2.normalize(log_R,None, 0, 255, cv2.NORM_MINMAX)
    log_uint8 = cv2.convertScaleAbs(dst_R)
    return log_uint8


def MSR_image(images,a):
    scales = [15, 101, 301]  # [3,5,9]
    results = []
    for image in images:
        b_gray, g_gray, r_gray = cv2.split(image)
        b_gray = MSR(b_gray, scales)
        g_gray = MSR(g_gray, scales)
        r_gray = MSR(r_gray, scales)
        results.append(cv2.merge([b_gray, g_gray, r_gray]))
    return results,0