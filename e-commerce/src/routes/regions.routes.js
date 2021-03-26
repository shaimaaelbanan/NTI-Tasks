const express=require('express')
const router = new express.Router()
const regionsModel = require('../models/regions.model')
const auth = require('../middleware/auth')
const multer = require('multer')

//regions
router.post('/Regions', auth, async(req,res)=>{
    try{
        const newRegions = new regionstModel({
            ...req.body,
            userId:req.user._id
        })
        await newRegions.save()
        res.status(200).send({
            apiStatus: true,
            data: newProduct,
            message:'user regions added'
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

//get all regions
router.get('/regions',auth, async(req,res)=>{
    let match = {}
    let sort ={}
    if(req.query.regionsId) match.content = req.query.content
    if(req.query.sortBy){
        const part = req.query.sortBy.split(':')
        sort[part[0]] = part[1]=='desc'?-1:1
    }
    try{
        await req.user.populate({
            path:'region' ,
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:(parseInt(req.query.page)*parseInt(req.query.limit)),
                sort
            }
        }).execPopulate()
        res.send(req.user.region)
    }
    catch(error){
        res.status(500).send({
            apiStatus: false,
            data: error.message,
            message:'user register error'
        })
    }
})

//get single region
router.get('/regions/:id', auth, async(req,res)=>{
    try{
        const _id = req.params.id
        const regions = await regionsModel.findOne({ _id , userId: req.user._id})
        if(!regions) throw new Error('invalid regions id')
        res.send(regions)
    }
    catch(error){
        res.status(500).send({
            apiStatus: false,
            data: error.message,
            message:'user register error'
        })
    }
}) 


// rate regions

// review on regions




module.exports = router