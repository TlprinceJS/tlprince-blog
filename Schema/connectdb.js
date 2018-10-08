//连接数据库 导出 db Schema
const mongoose = require("mongoose")
const db = mongoose.createConnection("mongodb://localhost:27017/blog",{useNewUrlParser: true})

//用原生es6的promise 代替mongoose的promise
mongoose.Promise = global.Promise

//监听数据库的连接情况
db.on("error", () => {
    console.log("连接数据库失败");
})

db.on("open", () =>{
    console.log("blog数据库连接成功");
})

const Schema = mongoose.Schema

module.exports = {
    db,
    Schema
}