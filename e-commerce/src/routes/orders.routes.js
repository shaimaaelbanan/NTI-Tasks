const express=require('express')
const router = new express.Router()
const ordersModel = require('../models/orders.model')
const auth = require('../middleware/auth')
const multer = require('multer')

//orders
router.post('/orders', auth, async(req,res)=>{
    try{
        const newOrders = new ordersModel({
            ...req.body,
            userId:req.user._id
        })
        await newOrders.save()
        res.status(200).send({
            apiStatus: true,
            data: newOrders,
            message:'user orders added'
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

//get all orders
router.get('/order',auth, async(req,res)=>{
    let match = {}
    let sort ={}
    if(req.query.ordersId) match.content = req.query.content
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
        res.send(req.user.Orders)
    }
    catch(error){
        res.status(500).send({
            apiStatus: false,
            data: error.message,
            message:'user register error'
        })
    }
})

//get single order
router.get('/orders/:id', auth, async(req,res)=>{
    try{
        const _id = req.params.id
        const orders = await ordersModel.findOne({ _id , userId: req.user._id})
        if(!orders) throw new Error('invalid orders id')
        res.send(orders)
    }
    catch(error){
        res.status(500).send({
            apiStatus: false,
            data: error.message,
            message:'user register error'
        })
    }
}) 


// rate orders
// review on orders




module.exports = router