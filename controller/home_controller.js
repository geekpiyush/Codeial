const Post = require('../model/post');
const User = require('../model/user');

module.exports.home = async function (req, res) {
  try {
    const posts = await Post.find({})
      .sort('-createdAt')
      .populate('user')
      .populate({
        path: 'comments',
        populate: {
          path: 'user'
        }
      })
      .exec();
    const users = await User.find({}).exec();
    
    return res.render('home', {
      title: 'Codial | Home',
      posts: posts,
      all_users: users
    });
  } catch (err) {
    console.log('An error occurred:', err);
    return res.status(500).json({ error: 'An error occurred' });
  }
};
