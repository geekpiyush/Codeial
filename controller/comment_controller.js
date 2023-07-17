const Comments = require('../model/comment');
const Post = require('../model/post');

module.exports.create = async function (req, res) {
  try {
    const post = await Post.findById(req.body.post).exec();

    if (post) {
      const comment = await Comments.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });

      post.comments.push(comment);
      await post.save();
    }

    res.redirect('/');
  } catch (err) {
    console.log('An error occurred:', err);
    return res.status(500).json({ error: 'An error occurred' });
  }
};
