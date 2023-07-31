const express =require('express')
const router = express.Router();
// import passport
const passport = require('passport')
const userController = require('../controller/user_controller');

router.get('/profile/:id',passport.checkAuthentication,userController.profile);
router.post('/update/:id',passport.checkAuthentication,userController.update);
router.get('/sign-up',userController.singUp)
router.get('/sign-in',userController.singIn)

router.post('/create',userController.create)
// use passport as middleware for authentication
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'}
),userController.createSession)

router.get('/sign-out',userController.destroySession)

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));

router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/sign-in'},userController.createSession));

module.exports = router;