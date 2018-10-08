const Router = require("koa-router")
const router = new Router()
const { reg } = require("../control/user")
const { login } = require("../control/user")

router.get("/", async(ctx) => {
    await ctx.render("index")
})

router.get(/^\/user\/(?=reg|login)/, async(ctx) => {
    const show = /reg$/.test(ctx.path)

    await ctx.render("register", {show})
})

router.post("/user/login", login)

router.post("/user/reg", reg)
module.exports = router