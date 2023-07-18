const express = require('express');
const Passport = require('passport')
const router = express.Router();

const postController =  require('../controller/post_controller');

router.post('/create',Passport.checkAuthentication,postController.create);
router.get('/destroy/:id',Passport.checkAuthentication,postController.destroy);
module.exports = router;