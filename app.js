if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const methodOverride = require('method-override');
const seedDb = require('./seed');
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('./models/user');
const flash = require('connect-flash');


// Routes
const productRoutes = require('./routes/product');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');

// 'mongodb://localhost:27017/shopApp'
mongoose.connect(process.env.DB_URL, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify:false,
        useCreateIndex:true
    })
    .then(()=>{
        console.log('Database Connected');
    })
    .catch(err =>{
        console.log('error occured',err);
});

// const iphone = new Product({name:'iPhone',img:'null',price:10000,description:'blahblah'});

// iphone.save()
//     .then(()=>{
//         console.log('ssaved to database');
//     })
//     .catch(err=>{
//         console.log('failed to save');
//         throw err;
//     });

// seedDb();


app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, '/views' ));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));


const sessionConfig = {
    secret:'whatisyoursecret',
    resave:false,
    saveUninitialized: true
}

app.use(session(sessionConfig));
app.use(flash());

//initialize passport and session for storing user info
app.use(passport.initialize());
app.use(passport.session());

// configuring the passport to use local strategy
passport.use(new localStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success= req.flash('success');
    res.locals.error= req.flash('error');
    res.locals.currentUser = req.user;
    next();
})


app.use(productRoutes);
app.use(authRoutes);
app.use(cartRoutes);






app.listen(process.env.PORT || 3000, ()=>{
    console.log('server running at port 3000');
});
