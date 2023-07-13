const mongoose = require('mongoose');
const {Schema} = mongoose;
const userSchema = new Schema(
    {
        email:
        {
            type:String,
            reruired:true,
            unique:true
        },
        password:
        {
            type:String,
            required:true
        },
        name:
        {
            type:String,
            required:true
        }
    },
    {
        timestamps:true
    }
)

const user = mongoose.model('user',userSchema);
module.exports =user;