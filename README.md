# 文件结构

defograin-uniapp uniapp前端

GuideFilter 算法模块

models 模型文件

static/ 静态文件及上传文件夹  
│   ├── js 前端动态文件  
│   ├── results 处理结果  
│   ├── show 渲染图片  
│   └── uploads_main 动态上传文件夹

templates 前端网页文件

testdata_process 加载测试数据

weights 权重文件

app.py 部署运行文件

deeplearning.py 调用去雾模型文件

derain_predict.py 调用去雨模型文件

net.py 模型结构文件

physical.py 调用基础去雾算法算法

utils.py 辅助函数文件
# 运行
```
python app.py 
```
在浏览器中输入对应的ip地址与端口号进入界面

# 功能介绍
1. “图片输入”可实现输入单个或一对图片进行去雨或去雾操作，并输出不同模型的可视化效果与相关指标对比；
2. “图片名称库”可实现上传文件或文件夹到uploads_main文件夹中（其中上传文件夹使用zip格式压缩，上传后自动解压），点击按钮实现批量图片处理，并生成pdf文件展示相关的数据可视化；
3. “算法名称库”可实现对目前已有算法的名称的查看；