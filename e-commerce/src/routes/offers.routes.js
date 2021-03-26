const express=require('express')
const router = new express.Router()
const offersModel = require('../models/offers.model')
const auth = require('../middleware/auth')
const multer = require('multer')

//offers
router.post('/offers', auth, async(req,res)=>{
    try{
        const newProduct = new offersModel({
            ...req.body,
            userId:req.user._id
        })
        await newOffers.save()
        res.status(200).send({
            apiStatus: true,
            data: newOffers,
            message:'user offers added'
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

//get all offers
router.get('/offer',auth, async(req,res)=>{
    let match = {}
    let sort ={}
    if(req.query.offersId) match.content = req.query.content
    if(req.query.sortBy){
        const part = req.query.sortBy.split(':')
        sort[part[0]] = part[1]=='desc'?-1:1
    }
    try{
        await req.user.populate({
            path:'Offer' ,
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:(parseInt(req.query.page)*parseInt(req.query.limit)),
                sort
            }
        }).execPopulate()
        res.send(req.user.Offers)
    }
    catch(error){
        res.status(500).send({
            apiStatus: false,
            data: error.message,
            message:'user register error'
        })
    }
})

//get single offer
router.get('/offers/:id', auth, async(req,res)=>{
    try{
        const _id = req.params.id
        const offers = await offersModel.findOne({ _id , userId: req.user._id})
        if(!offers) throw new Error('invalid offers id')
        res.send(offers)
    }
    catch(error){
        res.status(500).send({
            apiStatus: false,
            data: error.message,
            message:'user register error'
        })
    }
}) 


// rate offers

// review on offers




module.exports = router