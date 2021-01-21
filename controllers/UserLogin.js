const user = require('../models/user')


module.exports = (req,res) =>{
    user.create (
        req.body, (err,user) =>{

            if(err) {
              const loginError =  Object.keys(err.errors).map(keys => err.errors[keys].message)

                req.flash('loginError', loginError)
                req.flash('data', req.body)

              return  res.redirect('/user/create')
            }

            res.redirect('/')
        }
    )
}