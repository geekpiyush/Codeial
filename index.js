const express =  require('express');
const port = 8000;
const app = express();

// require express-ejs-layouts
const expressLayouts = require('express-ejs-layouts')

// require db 
const db = require('./config/mongoose')

// use static files for app like css js images
app.use(express.static('./assets'))

app.use(expressLayouts);

// extract style and scripts form the sub pages into the layouts
app.set('layout extractStyles',true)
app.set('layout extractScripts',true)

// set view engine ejs
app.set("view engine", "ejs");
app.set("views", "./views");

// require router for routing
app.use("/",require('./routes/home.js'))

app.listen(port,function(err)
{
    if(err)
    {
        console.log('there is an error')
    }
    console.log(`server is up on port number ${port}`)
})