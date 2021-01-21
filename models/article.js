const mongoose = require('mongoose')

const articleModel = new mongoose.Schema({
   title: String,
   content: String,
   author: String,
   image: String,
})

const article = mongoose.model('article', articleModel)

module.exports = article