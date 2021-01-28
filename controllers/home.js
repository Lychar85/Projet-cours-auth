const post = require('../models/article');

module.exports = async (req, res) => {
    const posts = await post.find({}).lean() 

    res.render('index', {posts})
}