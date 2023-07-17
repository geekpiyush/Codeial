const Post = require('../model/post');

module.exports.home = function (req, res) {
  Post.find({})
    .populate('user')
    .then((posts) => {
      return res.render('home', {
        title: 'Codial | Home',
        posts: posts,
      });
    })
    .catch((err) => {
      console.log('An error occurred:', err);
      return res.status(500).json({ error: 'An error occurred' });
    });
};
