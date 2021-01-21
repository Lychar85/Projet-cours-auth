const user = require('../models/user')

module.exports = (req,res,next) =>{
    //connexion base de donnée
    user.findById(req.session.userId, (err,user) =>{

        if(err || !user) {
            return res.redirect('/')
        }
        next()
    })
    //vérifier user

    //si il est dans la base de donnée

    //sinon tu le redirige
}