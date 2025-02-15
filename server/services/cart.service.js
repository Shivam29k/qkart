const config = require("../config/config")
const { Cart, Product } = require("../models/index")
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');


const getCartByUser = async (user)=>{
    let cart = await Cart.findOne({email:user.email})
    if(cart === null){
        throw new ApiError(httpStatus.NOT_FOUND, "User does not have a cart");
    }
    return cart
}

const addProductToCart = async (user,productId,quantity)=>{
    let cart = await Cart.findOne({email:user.email});
    if(!cart) {
        try {
            cart = await Cart.create({
                email:user.email,
                cartItems:[],
                paymentOption :config.default_payment_option
            });
        } catch (error) {
            throw new ApiError(httpStatus.BAD_REQUEST, "User cart creation failed");
        }
    }
    if(cart === null){
        throw new ApiError(httpStatus.NOT_FOUND, "User does not have a cart")
    }
    let productIndex = -1;
    for (let i = 0;i < cart.cartItems.length;i++){
        if(productId == cart.cartItems[i].product._id){
            productIndex = i
        }
    }
    if(productIndex == -1){
        let product =await Product.findOne({_id:productId});
        if(product == null) {
            throw new ApiError(httpStatus.NOT_FOUND, "Product does not exist in database");
        }
        cart.cartItems.push({product:product,quantity:quantity})
    } else {
        throw new ApiError(httpStatus.BAD_REQUEST, "Product already in the cart");
    }

    await cart.save()
    return cart;
}

const updateProductInCart = async (user, productId,quantity)=>{
  
    let cart = await Cart.findOne({email:user.email})
    if(cart == null){
        throw new ApiError(httpStatus.NOT_FOUND, "User does not have a cart");
    }

    let product = await Product.findOne({_id:productId})
    if(product == null){
        throw new ApiError(httpStatus.NOT_FOUND, "Product does not exist");
    }
    let productIndex = -1;
    for (let i = 0;i < cart.cartItems.length;i++){
        if(productId == cart.cartItems[i].product._id){
            productIndex = i
        }
    }
    if(productIndex == -1){
        throw new ApiError(httpStatus.NOT_FOUND, "Product not in cart")
    } else {
        cart.cartItems[productIndex].quantity = quantity;
    }
    await cart.save()
    return cart
}

const deleteProductInCart = async (user,productId)=>{
 let cart = await Cart.findOne({email:user.email})
 if(cart == null){
    throw new ApiError(httpStatus.NOT_FOUND, "User does nt have a cart")
 }
 let productIndex = -1;
 for (let i = 0;i < cart.cartItems.length;i++){
     if(productId == cart.cartItems[i].product._id){
         productIndex = i
     }
 }
 if(productIndex == -1){
    throw new ApiError(httpStatus.NOT_FOUND, "Product does not exist for this user")
 } else {
    cart.cartItems.splice(productIndex,1)
 }
 await cart.save()

}

const checkout = async (user)=>{
    let cart = await Cart.findOne({email:user.email})
    if(cart == null){
        throw new ApiError(httpStatus.NOT_FOUND, "User does not have a cart");
    }
    
    if(cart.cartItems.length === 0){
        throw new ApiError(httpStatus.BAD_REQUEST, "Cart is empty");
    }

    if(user.address == config.default_address){
        throw new ApiError(httpStatus.BAD_REQUEST, "Address not set");
    }

    let total = 0;
    for(let i =0;i<cart.cartItems.length;i++){
        total += cart.cartItems[i].product.cost * cart.cartItems[i].quantity;
    }
    if(total > user.walletMoney){
       throw new ApiError(httpStatus.BAD_REQUEST, "Insufficient balance");
    }
    
    user.walletMoney -= total;
    await user.save();

    cart.cartItems = []
    await cart.save();

}

module.exports = {
    getCartByUser,
    addProductToCart,
    updateProductInCart,
    deleteProductInCart,
    checkout
}

