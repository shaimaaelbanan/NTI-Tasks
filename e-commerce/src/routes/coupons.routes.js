const express=require('express')
const router = new express.Router()
const couponsModel = require('../models/coupons.model')
const auth = require('../middleware/auth')
const multer = require('multer')

//coupons
router.post('/coupons', auth, async(req,res)=>{
    try{
        const newCoupons = new couponsModel({
            ...req.body,
            userId:req.user._id
        })
        await newCoupons.save()
        res.status(200).send({
            apiStatus: true,
            data: newCoupons,
            message:'user coupons added'
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

//get all coupons
router.get('/coupons',auth, async(req,res)=>{
    let match = {}
    let sort ={}
    if(req.query.couponsId) match.content = req.query.content
    if(req.query.sortBy){
        const part = req.query.sortBy.split(':')
        sort[part[0]] = part[1]=='desc'?-1:1
    }
    try{
        await req.user.populate({
            path:'Coupons' ,
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

//get single coupon
router.get('/coupons/:id', auth, async(req,res)=>{
    try{
        const _id = req.params.id
        const coupons = await couponsModel.findOne({ _id , userId: req.user._id})
        if(!coupons) throw new Error('invalid coupons id')
        res.send(coupons)
    }
    catch(error){
        res.status(500).send({
            apiStatus: false,
            data: error.message,
            message:'user register error'
        })
    }
}) 


// rate coupons

// review on coupons




module.exports = router