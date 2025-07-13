# 📷 DefogRain - 去雾去雨图像处理系统

一个基于深度学习与传统算法的图像增强系统，支持通过网页界面上传图片并进行去雾、去雨处理，提供多种模型与算法对比结果。

---

## 📁 项目结构

```
defograin-uniapp/         # uni-app 前端项目主目录  
├── GuideFilter/          # 算法模块  
├── models/               # 模型文件目录  
├── static/               # 静态资源及上传文件夹  
│   ├── js/               # 前端动态脚本文件  
│   ├── results/          # 处理结果存储目录  
│   ├── show/             # 渲染图片展示目录  
│   └── uploads_main/     # 动态上传文件夹  
├── templates/            # 前端网页模板文件  
├── testdata_process/     # 测试数据加载模块  
├── weights/              # 权重文件目录  
├── app.py                # Flask 后端部署运行文件  
├── deeplearning.py       # 调用去雾模型文件  
├── derain_predict.py     # 调用去雨模型文件  
├── net.py                # 模型结构定义文件  
├── physical.py           # 基础去雾算法调用文件  
└── utils.py              # 辅助函数库  
```

---

## 🚀 快速启动（本地开发）

### ✅ 运行后端服务（Flask）

```bash
python app.py
```

访问默认地址：

```
http://127.0.0.1:5000
```

即可进入网页操作界面。

---

## 🌐 构建 H5 并部署到 Vercel

### ✅ 构建 H5（使用 Vue3 的 uni-app 项目）

```bash
npm run build:h5
```

构建完成后输出目录为：

```
dist/build/web/
```

### ✅ 部署到 Vercel（手动方式）

```bash
cd dist/build/web/
vercel --prod
```

部署成功后，你会获得一个公网可访问的链接，例如：

```
https://your-project-name.vercel.app
```

---

## ⚠️ 部署错误排查

如果你在访问部署后的页面时遇到以下错误：

```
Error: An error occurred with this application.
Your connection is working correctly.
Vercel is working correctly.
This is an error with the application itself, not the platform.
```

请检查以下几点：

1. ✅ `vercel.json` 是否存在且配置正确。
2. ✅ 构建命令是否正确执行，输出路径是否为 `dist/build/web/`。
3. ✅ 页面中引用的资源路径是否正确（如图片、JS 文件）。
4. ✅ 是否启用了 Vercel 的 Public Access 设置（确保项目对所有人可见）。

---

## 🧪 功能介绍

### 1. 图片输入功能
- 支持单张或成对图片上传；
- 可选择去雨或去雾算法；
- 展示不同模型的可视化效果；
- 输出相关指标对比图（PSNR、SSIM 等）。

### 2. 图片名称库功能
- 支持上传 `.zip` 压缩包文件夹；
- 自动解压至 `uploads_main/` 目录；
- 提供按钮实现批量处理；
- 生成 PDF 报告，包含所有图片的处理结果与图表。

### 3. 算法名称库功能
- 展示当前系统支持的所有去雾、去雨算法名称；
- 可扩展添加新算法接口。

---

## 📦 依赖安装

确保你已安装以下工具：

```bash
Node.js >= 16.x
npm
Vercel CLI
Python >= 3.8
Flask
PyTorch/TensorFlow（根据模型需求）
```

安装项目依赖：

```bash
npm install -g @vue/cli cross-env vercel
npm install @dcloudio/uni-cli --save-dev
pip install flask torch torchvision
```

---

## 🛠️ 自动化部署（推荐：GitHub Actions + Vercel）

将以下文件添加到 `.github/workflows/deploy-vercel.yml` 实现每次提交自动部署：

```yaml
name: Deploy to Vercel

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18

      - name: Install dependencies
        run: npm install -g @vue/cli cross-env && npm install

      - name: Build H5
        run: npm run build:h5

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          path: dist/build/web
          prod: true
```

> ✅ 在 GitHub Secrets 中设置好 `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` 即可启用自动化部署。

---

## 🧰 一键部署脚本（可选）

创建 `deploy.sh`：

```bash
#!/bin/bash

echo "📦 开始构建 H5 项目..."
npm run build:h5

cd dist/build/web/

echo "🚀 正在部署到 Vercel..."
vercel --prod

echo "✅ 部署完成！"
```

赋予执行权限：

```bash
chmod +x deploy.sh
./deploy.sh
```

---

## 📌 总结流程

```
1. 开发 uni-app 项目（HBuilderX / VSCode）
        ↓
2. 构建 H5 页面（npm run build:h5）
        ↓
3. 得到静态资源文件（dist/build/web/）
        ↓
4. 部署到 Vercel（vercel --prod）
        ↓
5. 获取公网访问链接（https://your-project.vercel.app）
        ↓
6. 设置为 Public 可访问（Vercel 控制台）
        ↓
✅ 部署完成，任何人可访问
```
