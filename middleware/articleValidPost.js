module.exports = (req,res,next) =>{
    
    if(!req.file) {
        return res.redirect('/')
    }
    next()
    
}