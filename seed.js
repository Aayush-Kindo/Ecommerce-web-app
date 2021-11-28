const mongoose = require('mongoose');
const products = require('./models/product');

const testproducts = [
    {
        name:'iPhone',
        img:'https://images.unsplash.com/photo-1570273282451-b22438331ba3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aXBob25lJTIwMTF8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        price:100000,
        description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
    {
        name:'laptop',
        img:'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fGFzdXMlMjBsYXB0b3B8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        price:40000,
        description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
    {
        name:'watch',
        img:'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHdhdGNofGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        price:500,
        description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
    {
        name:'headphone',
        img:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGVhZHBob25lfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        price:2000,
        description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
    {
        name:'shoes',
        img:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvZXN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        price:1000,
        description:'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
]

const seedDb = async()=>{
    await products.insertMany(testproducts);
    console.log('db seeded');
}

module.exports = seedDb;