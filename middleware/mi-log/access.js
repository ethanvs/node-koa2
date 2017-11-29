module.exports = (ctx, message, commonInfo) => {
    const {
        method, 
        url,
        host,  // 客户端host
        headers  //请求中的headers
    } = ctx.request

    const client = {
        method,
        url,
        host,
        message,
        referer: headers['referer'],  //请求的源地址
        userAgent: headers['user-agent']  // 客户端信息 设备及浏览器信息
    }
    return JSON.stringify(Object.assign(commonInfo, client))
}