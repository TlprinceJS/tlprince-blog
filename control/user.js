const { db } = require("../Schema/connectdb")
const userSchema = require("../Schema/userSchema")
const encrypt = require("../tool/encrypt")

const User = db.model("users", userSchema)
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

module.exports = reg