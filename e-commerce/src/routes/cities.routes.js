const express=require('express')
const router = new express.Router()
const productModel = require('../models.model')
const auth = require('../middleware/auth')
const multer = require('multer')

//cities
router.post('/cities', auth, async(req,res)=>{
    try{
        const newCities = new citiesModel({
            ...req.body,
            userId:req.user._id
        })
        await newProduct.save()
        res.status(200).send({
            apiStatus: true,
            data: newCities,
            message:'user cities added'
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

//get all cities
router.get('/city',auth, async(req,res)=>{
    let match = {}
    let sort ={}
        res.send(req.user.s)
        res.send(req.user.s)
        if(req.query.Id) match.content = req.query.content
    if(req.query.sortBy){
        const part = req.query.sortBy.split(':')
        sort[part[0]] = part[1]=='desc'?-1:1
    }
    try{
        await req.user.populate({
            path:'City' ,
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:(parseInt(req.query.page)*parseInt(req.query.limit)),
                sort
            }
        }).execPopulate()
        res.send(req.user.Cities)
    }
    catch(error){
        res.status(500).send({
            apiStatus: false,
            data: error.message,
            message:'user register error'
        })
    }
})

//get single cities
router.get('/cities/:id', auth, async(req,res)=>{
    try{
        const _id = req.params.id
        const cities = await citiesModel.findOne({ _id , userId: req.user._id})
        if(!cities) throw new Error('invalid cities id')
        res.send(cities)
    }
    catch(error){
        res.status(500).send({
            apiStatus: false,
            data: error.message,
            message:'user register error'
        })
    }
}) 


// rate cities

// review on cities




module.exports = router