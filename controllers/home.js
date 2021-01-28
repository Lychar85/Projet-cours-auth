const post = require('../models/article');

module.exports = async (req, res) => {
    const posts = await post.find({}).lean() //.limit(5) filtrer pour  afficher seulement 5 produit

    res.render('index', {posts})
}