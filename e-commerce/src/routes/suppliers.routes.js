const express=require('express')
const router = new express.Router()
const suppliersModel = require('../models/suppliers.model')
const auth = require('../middleware/auth')
const multer = require('multer')

//buy suppliers
router.post('/suppliers', auth, async(req,res)=>{
    try{
        const newSuppliers = new suppliersModel({
            ...req.body,
            userId:req.user._id
        })
        await newSuppliers.save()
        res.status(200).send({
            apiStatus: true,
            data: newSuppliers,
            message:'user suppliers added'
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

//get all suppliers
router.get('/suppliers',auth, async(req,res)=>{
    let match = {}
    let sort ={}
    if(req.query.suppliersId) match.content = req.query.content
    if(req.query.sortBy){
        const part = req.query.sortBy.split(':')
        sort[part[0]] = part[1]=='desc'?-1:1
    }
    try{
        await req.user.populate({
            path:'Supplier' ,
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

//get single suppliers
router.get('/suppliers/:id', auth, async(req,res)=>{
    try{
        const _id = req.params.id
        const suppliers = await suppliersModel.findOne({ _id , userId: req.user._id})
        if(!suppliers) throw new Error('invalid suppliers id')
        res.send(suppliers)
    }
    catch(error){
        res.status(500).send({
            apiStatus: false,
            data: error.message,
            message:'user register error'
        })
    }
}) 


// rate suppliers

// review on suppliers




module.exports = router