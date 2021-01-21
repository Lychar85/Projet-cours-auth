module.exports = (req,res,next) =>{
    
    if(!req.files) {
        return res.redirect('/article/add')
    }
    next()
    
}