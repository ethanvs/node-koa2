// 引入service文件
const HomeService = require('../service/home')

module.exports = {
    index: async(ctx, index) => {
        ctx.response.body = `<h1>index page</h1>`
    },
    home: async(ctx, next) => {
        ctx.response.body = '<h1>Home Page</h1>'
    },
    homeParams: async(ctx, next) => {
        console.log(ctx.request.query)
        console.log(ctx.request.querystring)
        ctx.response.body = '<h1>Home Page /:id/:name'
    },
    login: async(ctx, next) => {
        await ctx.render('home/login', {
            btnName: '开始你的表演'
        })
    },
    doLogin: async(ctx, next) => {
        let {name,password} = ctx.request.body
        
        let data = await HomeService.doLogin(name, password)
        ctx.response.body = data
    }
}