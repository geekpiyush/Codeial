// require post model
const Post = require('../model/post');

module.exports.create = async function(req, res) {
  try {
    const post = await Post.create({
      content: req.body.content,
      user: req.user._id
    });

    return res.redirect('back');
  } catch (err) {
    console.log('An error occurred:', err);
    return res.status(500).json({ error: 'An error occurred' });
  }
};
