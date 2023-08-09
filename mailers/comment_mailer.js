const nodeMailer = require('../config/nodemailer');

exports.newComment = (comment)=>
{
    console.log("inside newComment Mailers",comment);
    nodeMailer.transporter.sendMail(
        {
            from:'dpiyush28@gmail.com',
            to:comment.user.email,
            subject:'New Comment Published',
            html:'<h1>Yup Your Comment is Now Published</h1>'
        },(err,info)=>
        {
            if(err)
            {
                console.log('there is some error occurs',err)
                return;
            }
            console.log("message sent",info);
            return;
        }
    )
}