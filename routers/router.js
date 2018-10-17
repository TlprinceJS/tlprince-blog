const Router = require("koa-router")
const router = new Router()
const { reg } = require("../control/user")
const { login } = require("../control/user")
const { keepLog } = require("../control/user")
const { logout } = require("../control/user")
const { publishArticlePage } = require("../control/article")
const { publishArticle } = require("../control/article")
const { getInfo } = require("../control/article")

router.get("/", keepLog , getInfo)

router.get(/^\/user\/(?=reg|login)/, async(ctx) => {
    const show = /reg$/.test(ctx.path)

    await ctx.render("register", {show})
})

router.post("/user/login", login)

router.post("/user/reg", reg)

router.get("/user/logout", logout)

router.get("/article", keepLog, publishArticlePage)

router.post("/article", keepLog, publishArticle)
module.exports = router