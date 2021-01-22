const mongoose = require("mongoose");


const db = require('./keys').mongoURI

//CONNEXION A MONGODB--------------------------------------------
mongoose.connect(
    db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err) => {
        if (!err) console.log("MongoDB connect");
        else console.log("connect error:" + err);
    }
);