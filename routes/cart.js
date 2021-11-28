const express = require('express');
const { isLoggedIn } = require('../middleware');
const router = express.Router();

//open cart
router.get('/cart', isLoggedIn, (req,res)=>{
    res.render('cart/showCart');
})

//add products to cart 
router.get('/user/:userId/cart', isLoggedIn, async(req,res)=>{
    
    try{
        res.render('cart/showCart');
    }
    catch(e){
        req.flash('Unable to add this product to cart');
        res.render('/error');
    }

})


module.exports = router;

