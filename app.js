const
    port = 4000
express = require('express'),
    mongoose = require("mongoose"),
    bodyParser = require('body-parser'),
    app = express();

//app use-------------------------------------------------------------------------------------------------------------------------------------------------
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

//VIEWS---------------------------------------------------------------------------------------------------------------------------------------------------
//date--------------------------------------------
var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);

// Handlebars--------------------------------------------
exphbs = require("express-handlebars"),
    {
        allowInsecurePrototypeAccess
    } = require('@handlebars/allow-prototype-access');

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'hbs')

//connect mongoose---------------------------------------
require('./config/db')

//models-------------------------------------------------
const post = require('./models/article')

//route---------------------------------------------------------------------------------------------------------------------------------------------------
//index--------------------------------------------------
app.get('/', async (req, res) => {
    const posts = await post.find({})
    res.render('index', {
        posts
    })
});

//contact------------------------------------------------
app.get('/contact', (req, res) => {
    res.render('contact')
});

//Ajout article------------------------------------------
app.get('/articles/add', (req, res) => {
        res.render('articles/add')
    })
    .post('/article/post', (req, res) => {
        post.create(req.body, (err, docs) => {
            res.redirect('/')
        })

        console.log(req.body)
    });

//ArticleOne---------------------------------------------
app.get('/articles/:id', async (req, res) => {
    const article = await post.findById(req.params.id)
    console.log(req.params);
    res.render('articles', {
        article
    })
})



//ouvre le port---------------------------------------------------------------------------------------------------------------------------------------------------
app.listen(port, () => {
    console.log(`serveur connecter au port ${port}`);
})