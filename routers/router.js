const Router = require("koa-router")
const router = new Router()
const regf = require("../control/user")


router.get("/", async(ctx) => {
    await ctx.render("index")
})

router.get(/^\/user\/(?=reg|login)/, async(ctx) => {
    const show = /reg$/.test(ctx.path)

    await ctx.render("register", {show})
})

// router.post("/user/login", async (ctx) => {
//     const data = cxt.request.body
//     const username = data.username
// })

router.post("/user/reg", regf)
module.exports = router