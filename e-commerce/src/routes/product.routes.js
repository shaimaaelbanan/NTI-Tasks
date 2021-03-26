const express=require('express')
const router = new express.Router()
const productModel = require('../models/product.model')
const auth = require('../middleware/auth')
const multer = require('multer')

//buy product
router.post('/buyProduct', auth, async(req,res)=>{
    try{
        const newProduct = new productModel({
            ...req.body,
            userId:req.user._id
        })
        await newProduct.save()
        res.status(200).send({
            apiStatus: true,
            data: newProduct,
            message:'user product added'
        })
    }
    catch(error){
        res.status(500).send({
            apiStatus: false,
            data: error.message,
            message:'user register error'
        })
    }
})

//get all products
router.get('/products',auth, async(req,res)=>{
    let match = {}
    let sort ={}
    if(req.query.productId) match.content = req.query.content
    if(req.query.sortBy){
        const part = req.query.sortBy.split(':')
        sort[part[0]] = part[1]=='desc'?-1:1
    }
    try{
        await req.user.populate({
            path:'Products' ,
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:(parseInt(req.query.page)*parseInt(req.query.limit)),
                sort
            }
        }).execPopulate()
        res.send(req.user.Products)
    }
    catch(error){
        res.status(500).send({
            apiStatus: false,
            data: error.message,
            message:'user register error'
        })
    }
})

//get single product
router.get('/product/:id', auth, async(req,res)=>{
    try{
        const _id = req.params.id
        const product = await productModel.findOne({ _id , userId: req.user._id})
        if(!product) throw new Error('invalid product id')
        res.send(product)
    }
    catch(error){
        res.status(500).send({
            apiStatus: false,
            data: error.message,
            message:'user register error'
        })
    }
}) 


// rate product

// review on product




module.exports = router