const User = require('../../../model/user');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req,res)
{ 
    try
    {
        let user = await User.findOne({email:req.body.email});
        if(!user || user.password != req.body.password)
        {
            return res.json(422,
                {
                    message:'Invalid Username or Password'
                });
            }
            return res.json(200,
                {
                    message:'Sign in successfully,here is your token please keep it safe',
                    data:
                    {
                        token:jwt.sign(user.toJSON(),'codial',{expiresIn:'1000000'})

                    }
                })
    }catch(err)
    {
        console.log('there is some erorr',err)
        return res.json(500,
            {
                message:'Internal Server Error'
            })
    }
}