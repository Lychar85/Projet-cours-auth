const
    port = 4000
express = require('express'),
    
    mongoose = require("mongoose"),
    bodyParser = require('body-parser'),
    exphbs = require("express-handlebars"),
    Handlebars = require("handlebars"),
    fileupload = require('express-fileupload')

//controllers
const articleCreateController = require('./controllers/createArticles'),
    homePageController = require('./controllers/home'),
    articleOneController = require('./controllers/articleOne'),
    articlePostController = require('./controllers/articlePost')


app = express();


//middleware
const articleValidPost = require('./middleware/articleValidPost')
app.use('/article/post', articleValidPost)

//app use-------------------------------------------------------------------------------------------------------------------------------------------------
app.use(express.static(__dirname + "/public"))
app.use(bodyParser.json())
app.use(fileupload())
app.use(bodyParser.urlencoded({
    extended: true
}))

//VIEWS---------------------------------------------------------------------------------------------------------------------------------------------------
// Handlebars--------------------------------------------
exphbs = require("express-handlebars"), {
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

const fileUpload = require('express-fileupload');
const articleOne = require('./controllers/articleOne');
//models-------------------------------------------------


//route---------------------------------------------------------------------------------------------------------------------------------------------------
//index--------------------------------------------------
app.get('/', homePageController);

//contact------------------------------------------------
app.get('/contact', (req, res) => {
    res.render('contact')
});

//Ajout article------------------------------------------
app.get('/article/add', articleCreateController)
    .post('/article/post',articlePostController,);

//ArticleOne---------------------------------------------
app.get('/articles/:id',articleOneController )



//ouvre le port---------------------------------------------------------------------------------------------------------------------------------------------------
app.listen(port, () => {
    console.log(`serveur connecter au port ${port}`);
})