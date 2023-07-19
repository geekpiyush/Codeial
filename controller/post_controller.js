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
      req.flash('success',"Post Published")
    return res.redirect('back');

  } catch (err) {
    console.log('An error occurred:', err);
    req.flash('error',err)
    return res.redirect('back')
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
      req.flash('success',"Post and Associated Comments Deleted")
    }
    else {
      throw new Error('Unauthorized access');
    }

    res.redirect('back');
  } catch (err) {
    console.log('An error occurred:', err);
    req.flash('error',err)
    return res.status(500).json({ error: 'An error occurred' });
  }
};