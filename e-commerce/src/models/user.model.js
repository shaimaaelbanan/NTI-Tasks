const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const productModel = require('./product.model')
const userSchema = new mongoose.Schema({
    userId:{type:Number},
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
    products:[{
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
}
)
userSchema.virtual('Products', {
    ref:'Product',
    localField:'_id',
    foreignField:'userId'
})
userSchema.methods.toJSON = function(){
    const user = this.toObject()
    deleted = ['email', 'password', '_id', 'tokens', 'friends']
    deleted.forEach(element => {
        delete user[element]
    });
    return user
}
userSchema.pre('save', async function(next){
    lastUser = await User.findOne({}).sort({_id:-1})
    user = this
    if(!user.username)  user.username =user._id
    
    if(!lastUser) user.userId=1
    else user.userId = lastUser.userId+1    
    
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 12)
    }
    next()
})
userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWTKEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}
userSchema.statics.findByCredentials = async(email, password)=>{
    const user = await User.findOne({email})
    if(!user) throw new Error('invalid email')
    if(!user.accountStatus) throw new Error('please activate your account')
    const isvalid = await bcrypt.compare(password, user.password)
    if(!isvalid) throw new Error('invalid pass')
    return user
}
userSchema.pre('remove', async function(next){
    user = this
    await productModel.deleteMany({userId:user._id})
    next()
})
const User = mongoose.model('User',userSchema)
module.exports = User