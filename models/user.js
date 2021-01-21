const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userModel = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Le nom est obligatoire']
    },

    email: {
        type: String,
        required: [true, "L'email est obligatoire"],
        unique: true
    },

    password:{
        type: String,
        required: [true, 'Le mot de passe est obligatoire']
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