const Post = require('../../../model/post');
const Comments = require('../../../model/comment');
module.exports.index = async function(req,res)
{
    const posts = await Post.find({})
      .sort('-createdAt')
      .populate('user')
      .populate({
        path: 'comments',
        populate: {
          path: 'user'
        }
      })
    
    return res.json(200,
    {
        message:'List of Posts',
        Post: posts
    })
}

module.exports.destroy = async function (req, res) {
    try {
      const post = await Post.findById(req.params.id).exec();
  
      if (!post) {
        return res.redirect('back');
      }
  
      if (post.user.toString() === req.user.id) {
        await post.deleteOne();
        await Comments.deleteMany({ post: req.params.id }).exec();
        // if(req.xhr)
        // {
        //   return res.status(200).json(
        //     {
        //       data:
        //       {
        //         post_id:req.params.id
        //       },
        //       message:'Post Deleted Success'
        //     }
        //   )
        // }
        return res.json(200,
          {
            message:'Post and Associated Comments deleted'
          })
      }
        else {
           return res.json(401,
              {
                message:'You can not delete this post'
              })
        }
      }//   res.redirect('back');
     catch (err) {
      console.log('An error occurred:', err);
      req.flash('error',err)
      return res.status(500).json({ error: 'An error occurred' });
    }
  };