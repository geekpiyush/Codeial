const express =require('express')
const router = express.Router();
// import passport
const passport = require('passport')
const userController = require('../controller/user_controller');

router.get('/profile',passport.checkAuthentication,userController.profile);
router.get('/sign-up',userController.singUp)
router.get('/sign-in',userController.singIn)

router.post('/create',userController.create)
// use passport as middleware for authentication
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'}
),userController.createSession)

router.get('/sign-out',userController.destroySession)
module.exports = router;