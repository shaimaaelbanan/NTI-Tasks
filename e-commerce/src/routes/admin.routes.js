const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const express = require('express')
const router = new express.Router()
const userModel = require('../models/user.model')
const productModel = require('../models/product.model')
const adminModel = require('../models/admin.model')
const auth = require('../middleware/auth')
const fs = require('fs')
const multer = require('multer')
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// admin register
router.post('/adminRegister', async(req, res)=>{
    try{
        const admin = new adminModel(req.body)
        await admin.save()
        //send email with activate route
        msgBody = `welcome to activate your admin account /activate/${admin._id}`
        const msg = {
          to: admin.email, //user email
          from: 'trio_of_fun@gmail.com', //your email
          subject: 'Welcome Admin Panel',
          html: msgBody
        };
        sgMail.send(msg)
          .then(() => {}, error => {
            console.error(error);     
            if (error.response) {
              console.error(error.response.body)
            }
          });  
        res.status(200).send({
            apiStatus: true,
            data: user,
            message:'admin successfuly registered'
        })
    }
    catch(error){
        res.status(500).send({
            apiStatus: false,
            data: error.message,
            message:'admin register error'
        })
    }
} )

// activate account from email
router.get('/adminActivate/:id', async(req, res)=>{
    try{
        const _id= req.params.id
        const admin = await adminModel.findById({_id})
        if(!admin) throw new Error('invalid admin id')
        admin.accountStatus = true
        await admin.save()
        res.status(200).send({
            apiStatus:true,
            data: admin,
            message: 'admin status updated'
        })
    }
    catch(error){
        res.status(500).send({
            apiStatus: false,
            data: error.message,
            message:'admin register error'
        })
    }
})

// logout
router.post('/logoutAdmin', auth, async(req, res)=>{
    try{
        req.admin.tokens = req.admin.tokens.filter((element)=>{
            return element!=req.token
        })
        await req.admin.save()
        res.status(200).send({
            apiStatus: false,
            data:'',
            message:'logged out'
        })
    }
    catch(error){
        res.status(500).send({
            apiStatus: false,
            data: error.message,
            message:'admin register error'
        })
    }
})

// show profile
router.get('/adminProfile', auth,async(req,res)=>{
    res.send(req.admin)
})

// edit profile
router.patch('/admin/profile', auth, async(req,res)=>{
    requestedUpdates = Object.keys(req.body)
    allowed=['name', 'password']
    isValid = requestedUpdates.every(update=> allowed.includes(update))
    if(!isValid) return res.send('invalid')
    try{
        requestedUpdates.forEach(update=> req.admin[update] = req.body[update])
        await req.admin.save()
        res.send('updated')
    }
    catch(e){res.send(e)}
})

// deactivate account
router.get('/deactivateAdmin',auth, async(req, res)=>{
    try{
        req.admin.accountStatus= false
        await admin.save()
        res.status(200).send({
            apiStatus:true,
            data: admin,
            message: 'admin status updated'
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

// remove account
router.delete('/deleteAdmin', auth, async(req,res)=>{
    try{
        await req.admin.remove()
        res.status(200).send({
            apiStatus:true,
            data:'deleted',
            message:"deleted"
        })
    }
    catch(error){
        res.status(500).send({
            apiStatus: false,
            data: error.message,
            message:'admin register error'
        })
    }
})

// reset password
router.patch('/admin/editPassword', auth, async(req,res)=>{  
    try{
        const pass= req.body.password
        req.admin.password = pass
        await req.admin.save()
        res.send('passwod reseted')
    }
    catch(error){
        res.status(500).send({
            apiStatus: false,
            data: error.message,
            message:'admin register error'
        })
    }
    })

// add product
router.post('/addProduct', auth, async(req, res)=>{
    try{
        await req.product.save()
        res.send('added')
    }
    catch(error){
        res.status(500).send({
            apiStatus: false,
            data: error.message,
            message:'admin register error'
        })
    }
})

// edit product
router.patch('/AllProducts/:id', auth, async(req,res)=>{
    requestedUpdates = Object.keys(req.body)
    allowed=['title', 'details']
    isValid = requestedUpdates.every(update=> allowed.includes(update))
    if(!isValid) return res.send('invalid')
    try{
        requestedUpdates.forEach(update=> req.product[update] = req.body[update])
        await req.product.save()
        res.send('updated')
    }
    catch(e){res.send(e)}
})

// remove product
router.post('/removeProduct',auth, async(req,res)=>{
    try{
        req.product = req.product.filter((element)=>{
            return element!=req.body.pId
        })
        await req.product.save()
        res.status(200).send({
            apiStatus: false,
            data:'',
            message:'logged out'
        })
    }
    catch(error){
        res.status(500).send({
            apiStatus: false,
            data: error.message,
            message:'admin register error'
        })
    }
    })

// remove user
router.post('/removeUser',auth, async(req,res)=>{
    try{
        req.user = req.user.filter((element)=>{
            return element!=req.body.uId
        })
        await req.user.save()
        res.status(200).send({
            apiStatus: false,
            data:'',
            message:'logged out'
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

// show single user
router.get('/allUsers/:id', auth,async(req,res)=>{
    res.send(req.user)
})

// show all users








const adminBro = new AdminBro ({
    Databases: [],
    rootPath: '/admin'
})

const router = AdminBroExpress.buildRouter (adminBro)
module.exports = router