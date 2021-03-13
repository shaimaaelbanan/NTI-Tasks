//installed packages
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const fs = require('fs');
//custom vars
const PORT = 3000;
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
//functions
const readFile = function(){
    try{    
        customers = JSON.parse(fs.readFileSync('customers.json').toString())
    }
    catch(e){
        customers = []
    }
    return customers
}
const writeFile = function(customers){
    fs.writeFileSync('customers.json', JSON.stringify(customers))
}
//routes
app.get('', (req,res)=>{
    res.render('home',{
        pageName:'Home',
        userName: "Shaimaa Elbanan"
    })
})
app.get('/addCustomer',(req,res)=>{
    let customers= readFile()    
    if(req.query.name){
        customer = {
            name: req.query.name,
            username: req.query.username,
            email: req.query.email,
            address: req.query.address
        }
        customer.id = customers.length+1
        customers.push(customer)
        writeFile(customers)
        res.redirect('/allCustomers')
    }
    res.render('addCustomer')
})
app.get('/delCustomer/:id',(req,res)=>{
    let customers= readFile()
    const id = req.params.id
    console.log(id)   
    index = customers.findIndex(customer=>{
        return customer.id == id
    })
    if(index==-1) {
        console.log('customer not found')
        res.redirect('/allCustomers')
    }
    else
    {
        customers.splice(index, 1)
        writeFile(customers)
        console.log('deleted')
        res.redirect('/allCustomers')
    }
})
app.get('/allCustomers', (req,res)=>{
    res.render('allCustomers',{
        pageName:'All Customers',
        customers: readFile()
    })
})
app.get('/allCustomers/:id', (req,res)=>{
    let customers= readFile()
    const id= req.params.id
    res.render('singleCustomer',{
        pageName:'Single Customer',
        customer: customers[id]
    })
})
app.get('*', (req,res)=>{
    res.render('404',{
        pageName:'Error 404'
    })
})
//run server
app.listen(PORT)