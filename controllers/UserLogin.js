const user = require('../models/user')


module.exports = (req,res) =>{
    user.create (
        req.body, (err,user) =>{

            if(err) {
              const loginError =  Object.keys(err.errors).map(keys => err.errors[keys].message)
              req.session.loginError = loginError
              return  res.redirect('/user/create')
            }

            res.redirect('/')
        }
    )
}