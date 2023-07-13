// require user from models
const User = require('../model/user')

module.exports.profile = function(req,res)
{
    return res.render('users',
    {
        title:'Codial | Users'
    })
}

// creating an acction for sing-up page
module.exports.singUp = function(req,res)
{
    return res.render('sing-up',
    {
        title:'Codial | Sing-up'
    })
}

// creating an action for sing-in page

module.exports.singIn = function(req,res)
{
    return res.render('sing-in',
    {
        title:'Codial | Sing-in'
    })
}

// get the sing-up data
module.exports.create = async function (req, res) {
  try {
    if (req.body.password !== req.body.confirm_password) {
      console.log('Please check your confirm password');
      return res.redirect('back');
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      const newUser = await User.create(req.body);
      return res.redirect('/users/sign-in');
    } else {
      return res.redirect('back');
    }
  } catch (err) {
    console.error('Error:', err);
    return res.redirect('back');
  }
};


// create session for user

module.exports.createSession = function(req,res)
{
    // toda later
}