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

module.exports.destroy = async function(req,res)
{
  try
  {
    const comment = await Comments.findById(req.params.id);
      if(comment.user == req.user.id)
      {
        let postID = comment.post;
        await comment.deleteOne();

       Post.findByIdAndUpdate(postID,{$pull:{comments:req.params.id}})
       .then()
       {
        return res.redirect('back')
       }
      }
      else
      {
        return res.redirect('back')
      }
     
  } catch (err)
  {
    console.log('An error occurred:', err);
    return res.status(500).json({ error: 'An error occurred' });  }
} 
