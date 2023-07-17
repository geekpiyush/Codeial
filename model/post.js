const mongoose = require('mongoose');
const {Schema} = mongoose;
const postSchema = new mongoose.Schema(
    {
        content:
        {
            type:String,
            required:true
        },
        user:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        // includes the array of ids of all comments in this post Schema itself
        comments:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comments'
        }]
    },
    {
        timestamps:true
    }
)
const Post = mongoose.model('Post',postSchema);
module.exports = Post;