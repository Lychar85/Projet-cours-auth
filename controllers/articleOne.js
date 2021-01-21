const post = require('../models/article');

module.exports = async (req, res) => {
    const article = await post.findById(req.params.id)
    res.render('articles', {
        article
    })
}