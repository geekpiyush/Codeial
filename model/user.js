const mongoose = require('mongoose');
const multer = require('multer');
// require multer 
const Multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatar')
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
        },
        avatar:
        {
            type:String
        }
    },
    {
        timestamps:true
    }
)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,"..",AVATAR_PATH))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  

// define statics functions

userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar')
userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model('User',userSchema);
module.exports = User;