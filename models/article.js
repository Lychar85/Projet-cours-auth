const mongoose = require('mongoose');

const articleModel = new mongoose.Schema({
   title: String,
   content: String,
   author: String,
   createDate: {
      type: Date,
      default: new Date()
   }
})

const article = mongoose.model('article', articleModel)

module.exports = article
