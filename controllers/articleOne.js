const post = require('../models/article');

module.exports = async (req, res) => {
    const article = await post.findById(req.params.id)
    console.log(req.params);
    res.render('articles', {
        article
    })
}