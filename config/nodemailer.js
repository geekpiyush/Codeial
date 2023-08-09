const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

// creating transport
let transporter = nodemailer.createTransport(
    {
        service:'gmail',
        host:'smtp.gmail.com',
        // port number 587 for TLS
        port:587, 
        secure:false,
        auth:
        {
            user:'dpiyush28',
            pass:'zsiwkfuxmlutqhfq'
        }
    }
)

// rendering template

let renderTemplate = (data,relativePath)=>
{
    let mailHTML;
    ejs.renderFile
    (
        path.join(__dirname,'../views/mailer',relativePath),
        data,
        function(err,template)
        {
            if(err){console.log('error in rendering mailer files');return}
            mailHTML=template;
        })
    return mailHTML;
}

// exports files

module.exports = {
    transporter:transporter,
    renderTemplate:renderTemplate
}