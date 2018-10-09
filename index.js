const Koa = require("koa")
const router = require("./routers/router")
const static = require("koa-static")
const views = require('koa-views')
const { join } = require("path")
const logger = require("koa-logger")
const body = require("koa-body")
const session = require("koa-session")

// 生成Koa实例
const app = new Koa

//session配置中signed签名的值
app.keys = ["tlprince"]
//session的配置
const CONFIG = {
    key: "Sid",
    maxAge: 72e5,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: true //刷新过期时间
}

app
    // 注册日志文件
    .use(logger())
    // 配置koa-body 处理post请求
    .use(body())
    // 配置静态资源目录
    .use(static(join(__dirname,"public")))
    // 配置视图模板
    .use(views(join(__dirname,"views"),{extension: "pug"}))
    // 注册路由信息
    .use(router.routes()).use(router.allowedMethods())
    //配置session
    .use(session(CONFIG, app))

app.listen(3000, () => {
    console.log("项目启动成功，监听在3000端口");
})



