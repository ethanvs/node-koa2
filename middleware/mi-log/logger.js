const log4js = require('log4js')
// 引入日志输出信息的封装文件
const access = require('./access.js')
const methods = ['track', 'debug', 'info', 'warn', 'error', 'fatal', 'mark']

// 提取公用参数
const baseInfo = {
    appLogLevel: 'debug', // 指定日志记录的日志级别
    dir: 'logs',  // 指定日志存放的目录名
    env: 'dev',  // 指定当前环境, 当开发环境时,在控制的输出,方便调试
    projectName: 'node-koa2',  // 项目名,记录在日志中的项目信息
    serverIp: '0.0.0.0'  // 默认情况下服务器ip地址
}

const {env, appLogLevel, dir, serverIp, projectName} = baseInfo
// 增加常量, 用来存储公用的日志信息
const commonInfo = { projectName, serverIp }

module.exports = (options) => {
    const contextLogger = {}
    const appenders = {}

    // 继承自 baseInfo 默认参数
    const opts = Object.assign({}, baseInfo, options || {})
    // 需要的变量结构 方便使用
    const { env, appLogLevel, dir, serverIp, projectName } = opts
    const commonInfo = { projectName, serverIp }

    appenders.cheese = {
        type: 'dateFile', // 日志类型 
        filename: `${dir}/task`,  // 输出的文件名
        pattern: '-yyyy-MM-dd.log',  // 文件名增加后缀
        alwaysIncludePattern: true   // 是否总是有后缀名
    }

    // 环境变量为dev local development 认为是开发环境
    if (env === 'dev' || env === 'local' || env==='development') {
        appenders.out = {
            type: "console"
        }
    }

    let config = {
        appenders,
        categories: {
            default: {
                appenders: Object.keys(appenders),
                level: appLogLevel
            }
        }
    }
    
    const logger = log4js.getLogger('cheese')

    return async (ctx, next) => {
        const start = Date.now()
        
        log4js.configure(config)
        // 循环methods将所有方法挂载到ctx上
        methods.forEach((method, i) => {
            contextLogger[method] = (message) => {
                logger[method](message)
            }
        })
        ctx.log = contextLogger

        await next()
        const end = Date.now()
        const responseTime = end - start
        logger.info(`响应时间${responseTime/1000}s`)
    }
}