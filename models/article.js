const mongoose = require('mongoose');

const articleModel = new mongoose.Schema({
   title: String,
   intro: String,
   content: String,
})

const article = mongoose.model('article', articleModel)

module.exports = article
