const {index,one} = require('../models/product.model');

module.exports ={
    index: (req,res) => res.render('home',{
        products:index(),
        styles:['home']
    }),
    // Step 3
    addCart: (req,res) => {
        const {id} = req.body;
        const {cart} = req.session;
        // Find Product in DB
        const product = one(id);
        // Check product exist in cart
        // Case 1: Exist and update quantity
        if(cart.find(item => item.id === id)){
            cart.find(item => item.id === id).quantity++;
        }// Case 2: Add cart and set quantity
        else{
            cart.push({
                ...product,
                quantity:1
            });
        }
        return res.redirect('/'); 
    },
    // Step 5
    updateCart: (req,res) => {
        const {quantity} = req.body;
        const {id} = req.body;
        const {cart} = req.session;
        // Check quantity
        // Case 1: Is equal to zero then remove product
        if(quantity <= 0){
            cart = cart.filter(item => item.id != id);
        }else{
            // Case 2: Update all cart items setting quantity in product selected
            req.session.cart = cart.map(item => {
                if(item.id == id){
                    item.quantity = quantity;
                }
                return item;
            })
        }
        return res.redirect('/');
    }, 
    // Step 6
    removeCart: (req,res) =>{
        const {id} = req.body;
        const {cart} = req.session;
        req.session.cart = cart.filter(item => item.id != id);
        return res.redirect('/');
    }
}