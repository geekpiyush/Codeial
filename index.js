const express =  require('express');
// require cookie-parser
const cookieParser = require('cookie-parser');
const port = 8000;
const app = express();

// require express-ejs-layouts
const expressLayouts = require('express-ejs-layouts');

// require db 
const db = require('./config/mongoose');

// require express-session use for session cookies
const session = require('express-session');

// require passport for auth
const passport = require('passport');
const passportLocal = require('./config/passport-local-auth');

// require connect-mongo
// const MongoStore = require('connect-mongo')(session);


// use cookie parser
app.use(express.urlencoded());
app.use(cookieParser());

// require flash msg
const flash = require('connect-flash');
const customMware = require('./config/middleware')

// use static files for app like css js images
app.use(express.static('./assets'));

// make the upload path available to the browser
app.use('/uploads',express.static(__dirname + '/uploads'));
app.use(expressLayouts);

// extract style and scripts form the sub pages into the layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// set view engine ejs
app.set("view engine", "ejs");
app.set("views", "./views");

// mongoStore is used to store the session cookie in the db

app.use(session({
    name:'Codial',
    secret:'something',
    saveUninitialized:false,
    resave:false,
    cookie:
    {
        maxAge:(1000 * 60 * 100)
    }
    // store: new MongoStore({
    //     mongooseConnection:db,
    //     autoRemove:'disabled',
    // }
    // )
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// using flash
app.use(flash());
app.use(customMware.setFlash);

// require router for routing
app.use("/",require('./routes/home.js'));

app.listen(port,function(err)
{
    if(err)
    {
        console.log('there is an error');
    }
    console.log(`server is up on port number ${port}`);
})