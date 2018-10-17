//设置用户集合的Schema
const { Schema } = require("./connectdb")

const UserSchema = new Schema({
    username: String,
    password: String,
    avatar: {
        type: String,
        default: "avatar/default.jpg"
    }
}, {versionKey: false})

module.exports = UserSchema