// 注意 require('koa-router') 返回的是函数
const router = require('koa-router')();

const HomeController = require('../controller/home')

module.exports = (app) => {
    router.get('/', HomeController.index)

    router.get('/user', HomeController.login)

    router.post('/user/doLogin', HomeController.doLogin)

    app.use(router.routes()).use(router.allowedMethods())
}