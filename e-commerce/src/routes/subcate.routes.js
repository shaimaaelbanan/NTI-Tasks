const express=require('express')
const router = new express.Router()
const subcateModel = require('../models/subcate.model')
const auth = require('../middleware/auth')
const multer = require('multer')

//buy subcats
router.post('/subcate', auth, async(req,res)=>{
    try{
        const newSubcate = new subcateModel({
            ...req.body,
            userId:req.user._id
        })
        await newSubcat.save()
        res.status(200).send({
            apiStatus: true,
            data: newSubcat,
            message:'user subcate added'
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

//get all subcats
router.get('/subcates',auth, async(req,res)=>{
    let match = {}
    let sort ={}
    if(req.query.subcatId) match.content = req.query.content
    if(req.query.sortBy){
        const part = req.query.sortBy.split(':')
        sort[part[0]] = part[1]=='desc'?-1:1
    }
    try{
        await req.user.populate({
            path:'Subcates' ,
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:(parseInt(req.query.page)*parseInt(req.query.limit)),
                sort
            }
        }).execPopulate()
        res.send(req.user.Subcate)
    }
    catch(error){
        res.status(500).send({
            apiStatus: false,
            data: error.message,
            message:'user register error'
        })
    }
})

//get single subcate
router.get('/subcate/:id', auth, async(req,res)=>{
    try{
        const _id = req.params.id
        const subcate = await subcateModel.findOne({ _id , userId: req.user._id})
        if(!subcate) throw new Error('invalid subcate id')
        res.send(subcat)
    }
    catch(error){
        res.status(500).send({
            apiStatus: false,
            data: error.message,
            message:'user register error'
        })
    }
}) 


// rate subcate

// review on subcate

module.exports = router