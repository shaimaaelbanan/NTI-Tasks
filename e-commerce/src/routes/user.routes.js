const express = require('express')
const router = new express.Router()
const userModel = require('../models/user.model')
const auth = require('../middleware/auth')
const fs = require('fs')
const multer = require('multer')
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// user register
router.post('/register', async(req, res)=>{
    try{
        const user = new userModel(req.body)
        await user.save()

        //send email with activate route
        msgBody = `welcome to activate account /activate/${user._id}`
        const msg = {
          to: user.email, //user email
          from: 'trio_of_fun@gmail.com', //your email
          subject: 'Welcome mail',
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
            message:'user successfuly registered'
        })
    }
    catch(error){
        res.status(500).send({
            apiStatus: false,
            data: error.message,
            message:'user register error'
        })
    }
} )

// activate account from email
router.get('/activate/:id', async(req, res)=>{
    try{
        const _id= req.params.id
        const user = await userModel.findById({_id})
        if(!user) throw new Error('invalid user id')
        user.accountStatus = true
        await user.save()
        res.status(200).send({
            apiStatus:true,
            data: user,
            message: 'user status updated'
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

// logout
router.post('/logout', auth, async(req, res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((element)=>{
            return element!=req.token
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

// show profile
router.get('/myProfile', auth,async(req,res)=>{
    res.send(req.user)
})

// edit profile
router.patch('/user/profile', auth, async(req,res)=>{
    requestedUpdates = Object.keys(req.body)
    allowed=['name', 'password']
    isValid = requestedUpdates.every(update=> allowed.includes(update))
    if(!isValid) return res.send('invalid')
    try{
        requestedUpdates.forEach(update=> req.user[update] = req.body[update])
        await req.user.save()
        res.send('updated')
    }
    catch(e){res.send(e)}
})

// deactivate account
router.get('/deactivate',auth, async(req, res)=>{
    try{
        req.user.accountStatus= false
        await user.save()
        res.status(200).send({
            apiStatus:true,
            data: user,
            message: 'user status updated'
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
router.delete('/deleteUser', auth, async(req,res)=>{
    try{
        await req.user.remove()
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
            message:'user register error'
        })
    }
})

// reset password
router.patch('/user/editPassword', auth, async(req,res)=>{  
try{
    const pass= req.body.password
    req.user.password = pass
   await req.user.save()
    res.send('done')
}
catch(error){
    res.status(500).send({
        apiStatus: false,
        data: error.message,
        message:'user register error'
    })
}
})

// buy product
router.post('/buyProduct', auth, async(req, res)=>{
    try{
        const pId = req.body.pId
        const product = await userModel.findOne({_id: pId})
        if(!product) throw new Error('invalid product id')
        req.user.products = req.user.product.push(pId)
        await req.user.save()
    }
    catch(error){
        res.status(500).send({
            apiStatus: false,
            data: error.message,
            message:'user register error'
        })
    }
})

// rate product

// review on product

// show single product
router.get('/allProducts/:id', auth,async(req,res)=>{
    res.send(req.product)
})

// show all products



module.exports = router
