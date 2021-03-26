const express=require('express')
const router = new express.Router()
const addressModel = require('../models/address.model')
const auth = require('../middleware/auth')
const multer = require('multer')

//buy address
router.post('/address', auth, async(req,res)=>{
    try{
        const newAddress = new addressModel({
            ...req.body,
            userId:req.user._id
        })
        await newAddress.save()
        res.status(200).send({
            apiStatus: true,
            data: newAddresses,
            message:'user address added'
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

//get all addresses
router.get('/addresses',auth, async(req,res)=>{
    let match = {}
    let sort ={}
    if(req.query.addressId) match.content = req.query.content
    if(req.query.sortBy){
        const part = req.query.sortBy.split(':')
        sort[part[0]] = part[1]=='desc'?-1:1
    }
    try{
        await req.user.populate({
            path:'Addresses' ,
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:(parseInt(req.query.page)*parseInt(req.query.limit)),
                sort
            }
        }).execPopulate()
        res.send(req.user.Addresses)
    }
    catch(error){
        res.status(500).send({
            apiStatus: false,
            data: error.message,
            message:'user register error'
        })
    }
})

//get single address
router.get('/address/:id', auth, async(req,res)=>{
    try{
        const _id = req.params.id
        const address = await addressModel.findOne({ _id , userId: req.user._id})
        if(!address) throw new Error('invalid adress id')
        res.send(address)
    }
    catch(error){
        res.status(500).send({
            apiStatus: false,
            data: error.message,
            message:'user register error'
        })
    }
}) 


// rate address
// review on address




module.exports = router