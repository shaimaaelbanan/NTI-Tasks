const express=require('express')
const router = new express.Router()
const categoriesModel = require('../models/categories.model')
const auth = require('../middleware/auth')
const multer = require('multer')

// categories
router.post('/categories', auth, async(req,res)=>{
    try{
        const newCategories = new categoriestModel({
            ...req.body,
            userId:req.user._id
        })
        await newCategories.save()
        res.status(200).send({
            apiStatus: true,
            data: newCategories,
            message:'user Categories  added'
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

//get all categories
router.get('/Categories',auth, async(req,res)=>{
    let match = {}
    let sort ={}
    if(req.query.CategoriesId) match.content = req.query.content
    if(req.query.sortBy){
        const part = req.query.sortBy.split(':')
        sort[part[0]] = part[1]=='desc'?-1:1
    }
    try{
        await req.user.populate({
            path:'Categories' ,
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:(parseInt(req.query.page)*parseInt(req.query.limit)),
                sort
            }
        }).execPopulate()
        res.send(req.user.Categories)
    }
    catch(error){
        res.status(500).send({
            apiStatus: false,
            data: error.message,
            message:'user register error'
        })
    }
})

//get single category
router.get('/categories/:id', auth, async(req,res)=>{
    try{
        const _id = req.params.id
        const categories = await categoriesModel.findOne({ _id , userId: req.user._id})
        if(!Categories) throw new Error('invalid categories id')
        res.send(categories)
    }
    catch(error){
        res.status(500).send({
            apiStatus: false,
            data: error.message,
            message:'user register error'
        })
    }
}) 


// rate category

// review on categories




module.exports = router