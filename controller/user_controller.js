// require user from models
const User = require('../model/user')

module.exports.profile = async function (req, res) {
  try {
    const user = await User.findById(req.params.id).exec();

    return res.render('users', {
      title: 'Codial | Users',
      profile_user: user
    });
  } catch (err) {
    console.log('An error occurred:', err);
    return res.status(500).json({ error: 'An error occurred' });
  }
};



// creating an acction for sing-up page
module.exports.singUp = function(req,res)
{
  if(req.isAuthenticated())
  {
    return res.redirect('/users/profile')
  }
    return res.render('sing-up',
    {
        title:'Codial | Sing-up'
    })
}

// creating an action for sing-in page

module.exports.singIn = function(req,res)
{
  if(req.isAuthenticated())
  {
    return res.redirect('/users/profile')
  } 
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
  // req.flash('success','Log in Successfully..');
  return res.redirect('/');
}

module.exports.destroySession = function (req, res)
{
  try
  {
    req.logout(function(err)
    {
      if(err)
      {
        console.log('there is some error',err)
      }
      // req.flash('success','You have logged out successfully')
      return res.redirect('/')
    })
  }catch(err)
  {
    console.log("There is some error occurs",err)

  }
}  


// creating an action for update user profile

module.exports.update = async function (req, res)
 {
  if (req.user.id == req.params.id)
  {
    try {
      let user = await User.findById(req.params.id);
        User.uploadedAvatar(req,res,function(err)
        {
          if(err){console.log("multer-error",err);}
          console.log(req.file)
          user.name = req.body.name;
          user.email = req.body.email;
          if(req.file)
          {
            user.avatar = User.avatarPath + '/' + req.file.filename;
          }
          user.save();
          return res.redirect("back")
        })

    } catch (err) {
      console.log('An error occurred:', err);
      return res.status(500).json({ error: 'An error occurred' });
    }
  }
  else 
    {
      return res.status(401).send('Unauthorized');
    }
  } 