const express = require('express');
const products = require('../models/product');
const reviews = require('../models/review');
const router = express.Router();
const {isLoggedIn} = require('../middleware');

//Home Page to display all products

router.get('/', async(req,res)=>{
    try{
        const Products = await products.find({});
        res.render('products/index',{Products});
    }
    catch(e){
        log(e.message);
        req.flash('error','Unable to find Products');
        res.redirect('/error');
    }
})

//getting form for adding new Product
router.get('/products/new', isLoggedIn,(req,res)=>{
    res.render('products/new');
})

//create new Product
router.post('/', isLoggedIn, async(req, res) => {
    try{
        await products.create(req.body.product);
        req.flash('success','Product created successfully');
        res.redirect('/');
    }
    catch(e){
        console.log(e.message);
        req.flash('error','failed to create product');
        res.redirect('/');
    }
})

//show particular Product
router.get('/products/:id', async(req,res)=>{
    try{
        const product = await products.findById(req.params.id).populate('reviews');
        res.render('products/show',{product});
        console.log(product.reviews);
    }
    catch(e){
        console.log(e.message);
        req.flash('error','Unable to find the product');
        res.redirect('/error');
    }
})

//get form for editing Product
router.get('/products/:id/edit', isLoggedIn, async(req,res)=>{
    try{
        const product = await products.findById(req.params.id);
        res.render('products/edit',{product});
    }
    catch(e){
        console.log(e.message);
        req.flash('error','Failed To Edit This product');
        res.redirect('/error');
    }
})

//updating the Product
router.patch('/products/:id', isLoggedIn, async(req,res)=>{
    try{
        await products.findByIdAndUpdate(req.params.id,req.body.product);
        req.flash('success','product updated successfully');
        res.redirect(`/products/${req.params.id}`);
    }
    catch(e){
        console.log(e.message);
        req.flash('error','Failed to update the product');
        res.redirect('/error');
    }
})

//delete a particular product
router.delete('/products/:id', isLoggedIn, async(req,res)=>{
    try{
        await products.findByIdAndDelete(req.params.id);
        req.flash('success','Product deleted successfully');
        res.redirect('/');
    }
    catch(e){
        console.log(e.message);
        req.flash('error','cannot delete product');
        res.redirect('/error');
    }
})

//create new comment on Product
router.post('/products/:id/review', isLoggedIn, async(req,res)=>{
    const product = await products.findById(req.params.id);
    const review = new reviews({
        user: req.user.username,
        ...req.body
    });

    product.reviews.push(review);
    await review.save();
    await product.save();

    res.redirect(`/products/${req.params.id}`);
    
})

//error Page
router.get('/error',(req,res)=>{
    res.render('error');
})


module.exports = router;