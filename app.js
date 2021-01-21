const
    port = 4000
express = require('express'),
    mongoose = require("mongoose"),
    bodyParser = require('body-parser'),
    exphbs = require("express-handlebars"),
    Handlebars = require("handlebars"),
    fileupload = require('express-fileupload'),
    expressSession = require('express-session'),
    MongoStore = require('connect-mongo');

//controllers
const articleCreateController = require('./controllers/createArticles'),
    homePageController = require('./controllers/home'),
    articleOneController = require('./controllers/articleOne'),
    articlePostController = require('./controllers/articlePost'),
    userCreateController = require('./controllers/UserCreate'),
    userLoginController = require('./controllers/UserLogin'),
    userconnectController = require('./controllers/Userconnect'),
    userAuthController = require('./controllers/userAuth')
app = express();

//connect mongoose---------------------------------------
require('./config/db')



app.use(express.static(__dirname + "/public"))
//app use-------------------------------------------------------------------------------------------------------------------------------------------------


const mongoStore = MongoStore(expressSession)
app.use(expressSession({
    secret: 'securite',
    name: 'biscuit',
    saveUninitialized: true,
    resave: false,

    store: new mongoStore (
        {mongooseConnection: mongoose.connection}
    )
}))

app.use(bodyParser.json())
app.use(fileupload())
app.use(bodyParser.urlencoded({
    extended: true
}))



/*
// Moment (Handlebars)
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);*/

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

//middleware

const articleValidPost = require('./middleware/articleValidPost')
app.use('/article/post', articleValidPost)

const auth = require('./middleware/auth')
app.use('/article/add',auth)

//route---------------------------------------------------------------------------------------------------------------------------------------------------
//index--------------------------------------------------
app.get('/', homePageController);

//contact------------------------------------------------
app.get('/contact', (req, res) => {
    res.render('contact')
});

//Ajout article------------------------------------------
app.get('/article/add', auth, articleCreateController)
    .post('/article/post',auth, articleValidPost, articlePostController, );

//ArticleOne---------------------------------------------
app.get('/articles/:id', articleOneController)

//User---------------------------------------------------
app.get('/user/create', userCreateController)
    .post('/user/login', userLoginController)

//connexion----------------------------------------------
app.get('/user/connect', userconnectController)
.post('/user/connectAuth', userAuthController)

//ouvre le port---------------------------------------------------------------------------------------------------------------------------------------------------
app.listen(port, () => {
    console.log(`serveur connecter au port ${port}`);
})