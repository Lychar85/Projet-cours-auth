const mongoose = require('mongoose')
const article = require('./models/article')

mongoose.connect(
    "mongodb://localhost:27017/blog-test", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });



article.findById("6006a51ad104a12bbc51e281",(err, docs) => {

    console.log(err, docs);
})





/*
article.create({
    title: "BatMan",
    intro: "Avis sur le film",
    content: "Critique sur le film",
}, (err, post) => {
    console.log(err, post);
})*/