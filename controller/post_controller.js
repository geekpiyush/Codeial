// require post model
const Post = require('../model/post');
// require  comments
const Comments = require('../model/comment');

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

module.exports.destroy = async function (req, res) {
  try {
    const post = await Post.findById(req.params.id).exec();

    if (!post) {
      return res.redirect('back');
    }

    if (post.user.toString() === req.user.id) {
      await post.deleteOne();
      await Comments.deleteMany({ post: req.params.id }).exec();
    } else {
      throw new Error('Unauthorized access');
    }

    res.redirect('back');
  } catch (err) {
    console.log('An error occurred:', err);
    return res.status(500).json({ error: 'An error occurred' });
  }
};