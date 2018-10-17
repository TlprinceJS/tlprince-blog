const { db } = require("../Schema/connectdb")
const uarticleSchema = require("../Schema/articleSchema")
const encrypt = require("../tool/encrypt")
const userSchema = require("../Schema/userSchema")

const Article = db.model("articles", uarticleSchema)
const User = db.model("users", userSchema)
//返回用户发表文章页面
const publishArticlePage = async (ctx) => {
    await ctx.render("add-article", {
        title: "文章发表",
        session: ctx.session
    })
}
//文章发表 (存入数据库)
const publishArticle = async (ctx) => {
    if(ctx.session.isNew) {
        return ctx.body = {
            msg: "用户未登录",
            status: 0
        }
    }

    const data = ctx.request.body

    data.author = ctx.session.userid

    await new Promise ((resolve, reject) => {
        new Article(data).save((err, data) => {
            if(err) return reject(err)

            resolve(data)
        })
    })
    .then( (data) => {
        ctx.body = {
            msg: "发表成功",
            status: 1
        }
    })
    .catch( (data) => {
        ctx.body = {
            msg: "发表失败",
            status: 0
        }
    })
}
//获取文章列表信息
const getInfo = async (ctx) => {
    console.log(ctx.session)
    await ctx.render('index', {
        title: '小王子',
        session: ctx.session
    })
}


module.exports = {
    publishArticlePage,
    publishArticle,
    getInfo
}