//设置用户集合的Schema
const { Schema } = require("./connectdb")
const ObjectId = Schema.Types.ObjectId
const ArticleSchema = new Schema({
    title: String,
    content: String,
    author: {
        type: ObjectId,
        ref: "users"
      },
    tips: String
}, {versionKey: false, timestamps: {
    createdAt: "createdDate"
}})

module.exports = ArticleSchema