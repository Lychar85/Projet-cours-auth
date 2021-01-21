const post = require('../models/article');

module.exports = async (req, res) => {
    const posts = await post.find({})

    console.log(req.session);

    res.render('index', {
        posts
    })
}