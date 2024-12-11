export const $request = (options) => {
    const { url, data, method = 'GET' } = options;

    // 构建查询字符串
    let queryString = '';
    if (method === 'GET' && data) {
        queryString = new URLSearchParams(data).toString();
        queryString = queryString ? `?${queryString}` : '';
    }

    // 完整的URL，包括查询字符串
    const fullUrl = `${url}${queryString}`;

    // 根据请求方法设置请求的配置
    const requestOptions = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        ...(method !== 'GET' && { body: JSON.stringify(data) }),
    };

    // 发送请求
    return fetch(fullUrl, requestOptions)
        .then(response => {
            const status = response.status;
            const contentType = response.headers.get('content-type');

            // 检查响应状态码
            if (!response.ok) {
                return response.text()
                    .then(text => ({ status, data: text, error: true }));
            }

            // 根据 Content-Type 解析响应
            if (contentType && contentType.includes('application/json')) {
                // 如果是 JSON 数据
                return response.json()
                    .then(json => ({ status, data: json, error: false }));
            } else if (contentType && contentType.includes('text/html')) {
                // 如果是 HTML 内容
                return response.text()
                    .then(html => ({ status, data: html, error: false }));
            } else {
                // 其他类型的数据
                return response.blob()
                    .then(blob => ({ status, data: blob, error: false }));
            }
        })
        .catch(error => {
            console.error('Request failed:', error);
            return { status: null, error: true, message: error.message };
        });
};
