const AdminBro = require('admin-bro')
const AdminBroMongoose = require('@admin-bro/mongoose')
const mongoose = require('mongoose')

const productSchema = require('./product.model')
const userSchema = require('./user.model')

const adminSchema = new mongoose.Schema({
    adminId:{type:Number},
    fname:{type:String, required:true, trim:true},
    lname:{type:String, required:true, trim:true},
    accountStatus:{type:Boolean, default:false},
    phone:{
        type:String,
        trim:true
    },
    country:{
        type:String,
        required:true,
        trim:true,
        enum:['egypt', 'palstine', 'canda', 'iraq']
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    birthdate:{
        type:Date
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error('invalid email')
        }
    },
    username:{
        type:String,
        unique:true
    },
    addresses:[{
        address: {
            addrType:{type:String}, 
            addrDetails:{type:String}
        }
    }],
    users:[{
        type:mongoose.Schema.Types.ObjectId
    }],
    tokens:[
        {token:{type:String, required:true}}
    ],
    userProfile:{
        type:String
    }
},{
    timestamps:true
})

AdminBro.registerAdapter(AdminBroMongoose)
const Admin = mongoose.model('Admin',adminSchema)
module.exports = Admin