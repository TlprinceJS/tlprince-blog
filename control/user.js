const { db } = require("../Schema/connectdb")
const userSchema = require("../Schema/userSchema")
const encrypt = require("../tool/encrypt")

const User = db.model("users", userSchema)

//注册判断
const reg = async (ctx) => {

    //接收用户数据
    const data = ctx.request.body
    const username = data.username
    const password = data.password

    await new Promise((resolve,reject) => {
        //数据库中查询注册的用户名
        User.find({username}, (err, data) => {
            
            //查询出错
            if(err) return reject(err)
            
            //查询有数据--用户名存在
            if(data.length != 0) return resolve("")
            
            //查询无数据--用户名不存在
            const userdata =new User({
                username,
                password: encrypt(password)//加密密码
            })

            userdata.save((err, data) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })

        })
    })
    .then(async (data) => { 
        if(data){
            //注册成功
            console.log(data);
            await ctx.render("isOk",{status: "注册成功"})
        } else {
            //用户名已存在
            await ctx.render("isOk",{status: "用户名已存在"})
        }
    })
    .catch(async (err) => {
        //注册失败
        await ctx.render("isOk",{status: "注册失败"})
    })
}

//登录判断
const login = async (ctx) => {
    const data = ctx.request.body
    const username = data.username
    const password = data.password

    await new Promise ((resolve,reject) => {
        //查找用户名是否存在
        User.find({username}, (err, data) => {
            if(err) return reject(err)
            if(data.length === 0) return reject("用户名不存在")
            //比较密码是否相同
            if(data[0].password === encrypt(password)){
                return resolve(data)
            } else {
                resolve("")
            }
        })
    })
    .then(async (data) => {
        if(!data){
            await ctx.render("isOk",{status: "密码不正确"})
        }

        ctx.cookies.set("username", username, {
            domain: "localhost",
            path: "/",
            maxAge: 72e5,
            httpOnly: true,
            overwrite: false
        })

        ctx.cookies.set("userid", data[0]._id, {
            domain: "localhost",
            path: "/",
            maxAge: 72e5,
            httpOnly: true,
            overwrite: false
        })

        ctx.session = {
            username,
            userid: data[0]._id
        }

        await ctx.render("isOk",{status: "登录成功"})
    })
    .catch(async (err) => {
        await ctx.render("isOk",{status: "登录失败"})
    })
}

const keepLog = async (ctx, next) => {
    if(ctx.session.isNew) {
        if(ctx.cookies.get("userid")) {
            ctx.session = {
                username: ctx.cookies.get("username"),
                userid: ctx.cookies.get("userid")
            }
        }
    }
    
    await next()
}

const logout = async (ctx) => {
    //清除session
    ctx.session = null
    //清除cookies
    ctx.cookies.set("userid", null, {maxAge: 0})
    ctx.cookies.set("username", null, {maxAge: 0})
    //重定向到根路径
    ctx.redirect("/")
}

module.exports = {
    reg,
    login,
    keepLog,
    logout
}