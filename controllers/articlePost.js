path = require('path')
const post = require('../models/article');

module.exports =  (req, res) => {
    const {
        image
    } = req.files
    const uploadfile = path.resolve(__dirname, '..', 'public/upload', image.name)

    image.mv(uploadfile, (err) => {
        post.create(
            {
            ...req.body,
            image : `/upload/${image.name}`    
            },
            
            (err, docs) => {
            res.redirect('/')
        })
    })
}