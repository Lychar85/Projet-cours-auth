const
    port = 4000
    express = require('express'),
    mongoose = require("mongoose"),
    app = express();




    app.use(express.static(__dirname + "/public"));
//VIEWS-------------------------------------------------------------
const
    exphbs = require("express-handlebars"),
    Handlebars = require("handlebars"),
    {
        allowInsecurePrototypeAccess
    } = require('@handlebars/allow-prototype-access');

// Handlebars-------------------------------------------------------------
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'hbs')


require('./config/db')




app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/', (req, res) => {
    res.render('index')
})









app.listen(port, () => {
    console.log(`serveur connecter au port ${port}`);
})