//npm run dev
//installed packages
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const fs = require('fs');
const myMethods = require('./utils/functions')
//custom vars
const PORT = process.env.PORT
//create instance from express
const app = express();
//set default engine for dynamic html files
app.set('view engine','hbs')
//get public and view and partials paths
const publicDir = path.join(__dirname, '../public')
const viewDir = path.join(__dirname,'../frontend/views')
const partialsDir = path.join(__dirname,'../frontend/partials')
//set use of public and views and partials paths
app.use(express.static(publicDir))
app.set('views', viewDir)
hbs.registerPartials(partialsDir)
//routes
app.get('',(req,res)=>{
    if(req.query.name && req.query.phone) {
        user = {
            name:req.query.name,
            email:req.query.email,
            phone:req.query.phone,
            msg:req.query.msg
        }
        myMethods.addUser(user)
        return res.redirect('/showAll')
    }
    res.render('addUser')
})

app.get('/showAll', (req,res)=>{
    myMethods.showAll((err,data)=>
        {
            console.log(data)
            res.render('allUsers', {data})
        }
    )

})

app.get('/showAll/:id',(req,res)=>{
    id = req.params.id
    myMethods.showSingle(id, (err,data)=>{
        res.render('singleUser', {data})
    })
})

app.get('/deleteUser/:id', (req,res)=>{
    user = req.params.id
    myMethods.deleteUser(user)
    res.render('/showAll')
})


app.get('/editUser/:id', (req,res)=>{
    id = req.params.id   
    if(req.query.newName) {
    myMethods.editUser(id,req.query.newName,req.query.newEmail,req.query.newPhone,req.query.newMsg)
    res.redirect('/showAll')
    }
    myMethods.showSingle(id,(err,data)=>{
        res.render('editUser', {data})        
      })


    
})

app.listen(PORT)