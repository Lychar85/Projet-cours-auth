const user = require('../models/user'),
    bcrypt = require('bcrypt')


module.exports = (req, res) => {
    const {email, password } = req.body;

    user.findOne({ email }, (err, user) => {
        if (user) {

            bcrypt.compare(password, user.password, (err, same) => {
                if (same) {

                    req.session.userId = user._id

                    res.redirect('/')
                } else {
                    res.redirect('/user/connect')
                }
            })
        } else {
            return res.redirect('/user/connect')
        }
    })

}