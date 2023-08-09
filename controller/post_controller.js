// require post model
const Post = require('../model/post');
// require  comments
const Comments = require('../model/comment');

module.exports.create = async function(req, res) {
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id
    });

    // check ajax req
    if(req.xhr)
    {
      // Post.populate for display name
      post = await post.populate('user','name');
      
      return res.status(200).json(
        {
          data:
          {
            post:post
          },
          message: 'Post Created..!'
        }
      )
    }
    
    req.flash('success',"Post Published");
    return res.redirect('back');

  } catch (err) {
    console.log('An error occurred:', err);
    return res.redirect('back')
  }
};

module.exports.destroy = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);

    if(post.user == req.user.id) 
    {
      await post.deleteOne();
      await Comments.deleteMany({post:req.params.id});

      if(req.xhr)
      {
        return res.status(200).json(
          {
            data:
            {
              post_id:req.params.id
            },
            message:'Post Deleted Success'
          })
      } 
    }
    req.flash('success',"Post and Associated Comments Deleted")
    res.redirect('back');

  } catch (err) {
    console.log('An error occurred:', err);
    req.flash('error',err)
    return res.status(500).json({ error: 'An error occurred' });
  }
};