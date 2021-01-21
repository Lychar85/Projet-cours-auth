const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userModel = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password:{
        type: String,
        required: true
    },
    

})

userModel.pre('save', function (next) {
    const user = this
    bcrypt.hash(user.password, 10, (err, encr) => {

        user.password = encr
        next()
    })
})

module.exports = mongoose.model('user', userModel)