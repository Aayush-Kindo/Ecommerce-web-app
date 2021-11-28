const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
// const {isLoggedIn} = require('../middleware');


// router.get('/fakeUser', async(req,res)=>{
//     const user = new User({emailAddress:'xyz@gmail.com',username: 'user'});
//     const newUser = await User.register(user,'123');
//     res.send(newUser);
// })


//get register form
router.get('/register', (req,res)=>{
    res.render('auth/register');
})

//register user
router.post('/register', async(req,res)=>{
    const user = new User({ username: req.body.username,email: req.body.email });
    const newUser = await User.register(user, req.body.password);
    res.redirect('/login');
})

//get login form

router.get('/login', (req,res)=>{
    if(!req.user){
        res.render('auth/login');
    }
    else{
        req.flash('error','already loggedIn');
        res.redirect('/');
    }
    
})

//login user

router.post('/login', 
    passport.authenticate('local', 
                    {                        
                        failureRedirect: '/login',
                        failureFlash: true 
                    }
                    ),(req,res)=>{
                        console.log(req.user.username);
                        req.flash('success',`Welcome Back ${req.user.username}`);
                        res.redirect('/');
                    }
)

//logout
router.get('/logout', (req,res)=>{
    req.logout();
    req.flash('success','logged Out')
    res.redirect('/login');
})


module.exports = router;