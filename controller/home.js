// 引入service文件
const HomeService = require('../service/home')

module.exports = {
    index: async(ctx, index) => {
        await ctx.render("home/index", {title: "主页"})
    },
    login: async(ctx, next) => {
        await ctx.render('home/login', {
            btnName: '开始你的表演'
        })
    },
    doLogin: async(ctx, next) => {
        let params = ctx.request.body
        let name = params.name
        let password = params.password
        let res = await HomeService.doLogin(name, password)
        
        if(res.code == 200) {
            ctx.state.title = "个人中心"
            await ctx.render("home/success", res.data)
        } else {
            await ctx.render("home/login", res.data)
        }
    }
}