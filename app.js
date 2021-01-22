const
    port = 4000,
    express = require('express'),
    mongoose = require("mongoose"),
    bodyParser = require('body-parser'),
    fileupload = require('express-fileupload'),
    expressSession = require('express-session'),
    MongoStore = require('connect-mongo');
    

flash = require('connect-flash');

//controllers
const articleCreateController = require('./controllers/createArticles'),
    homePageController = require('./controllers/home'),
    articleOneController = require('./controllers/articleOne'),
    articlePostController = require('./controllers/articlePost'),

    userCreateController = require('./controllers/UserCreate'),
    userLoginController = require('./controllers/UserLogin'),
    userAuthController = require('./controllers/userAuth'),
    
    userconnectController = require('./controllers/Userconnect'),
    userDeconnectController = require('./controllers/userDeconnect');

app = express();

//connect mongoose---------------------------------------
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(fileupload())

//app use-------------------------------------------------------------------------------------------------------------------------------------------------
//save cookies---------------------------------------
const mongoStore = MongoStore(expressSession)
app.use(expressSession({
    secret: 'securite',
    name: 'biscuit',
    saveUninitialized: true,
    resave: false,
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}))


//affiche message d'erreur----------------------------
app.use(flash())


app.use(express.static(__dirname + "/public"))

//VIEWS---------------------------------------------------------------------------------------------------------------------------------------------------
function stripTags(input) {
    return input.replace(/<(?:.|\n)*?>/gm, '')
}

// Handlebars--------------------------------------------
const Handlebars = require("handlebars"),
    MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);

exphbs = require("express-handlebars"),

app.engine('hbs', exphbs({
    helpers: {
        stripTags: stripTags
    },
    defaultLayout: 'main',
    extname: 'hbs'
}));

app.set('view engine', 'hbs')
require('./config/db')
app.use('*', (req, res, next) => {
    res.locals.user = req.session.userId;
    next()
})





//middleware

const articleValidPost = require('./middleware/articleValidPost')
app.use('/article/post', articleValidPost)

const auth = require('./middleware/auth')
app.use('/article/add', auth)

const redirectAuthsucess = require('./middleware/redirectAuthsucess')

//route---------------------------------------------------------------------------------------------------------------------------------------------------
//index--------------------------------------------------
app.get('/', homePageController);

//contact------------------------------------------------
app.get('/contact', (req, res) => {
    res.render('contact')
});

//Ajout article------------------------------------------
app.get('/article/add', auth, articleCreateController)
    .post('/article/post', auth, articlePostController)

//ArticleOne---------------------------------------------
app.get('/articles/:id', articleOneController)

//User---------------------------------------------------------------------------------------------------------
app.get('/user/create', redirectAuthsucess, userCreateController)
    .post('/user/login', redirectAuthsucess, userLoginController)

    .get('/user/deconnect', userDeconnectController)
//connexion----------------------------------------------
app.get('/user/connect', redirectAuthsucess, userconnectController)
    .post('/user/connectAuth', redirectAuthsucess, userAuthController)





app.use((req, res) => {
    res.render('err404')
})


//ouvre le port---------------------------------------------------------------------------------------------------------------------------------------------------
app.listen(port, () => {
    console.log(`serveur connecter au port ${port}`);
})