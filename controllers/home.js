const post = require('../models/article');

module.exports = async (req, res) => {
    console.log(res);
    const posts = await post.find({})

    res.render('index', {
        posts
    })
}