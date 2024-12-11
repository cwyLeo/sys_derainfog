import { toNextDir } from "./api.js";
document.getElementById('lefile3').addEventListener('change', function () {
    var file = this.files[0]
    document.getElementById('photoCover3').value = file.name;
});
function index(filename) {
    var actionOption = document.querySelector('input[name="imageAction"]:checked').value;
    // 创建一个 FormData 对象
    console.log(filename)
    var formData = new FormData();
    // 添加文件名到 FormData
    arrayM = '{{ items|tojson|safe }}';
    arrayM = JSON.parse(arrayM)
    items = JSON.stringify(arrayM)
    // 发送 POST 请求到 /call_index 路由
    toNextDir(items,path,parent_path,filename,imageAction)
    .then(response => response.data.text())
    .then(html => {
            document.body.innerHTML = html
    });
    // .catch(error => console.error(error));
}