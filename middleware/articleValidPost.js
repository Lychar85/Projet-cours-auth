module.exports = (req,res,next) =>{
    
    if(!req.file) {
        return res.redirect('/')
    }
    console.log("am batman")
    next()
    
}