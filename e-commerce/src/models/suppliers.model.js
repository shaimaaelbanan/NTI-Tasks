const mongoose = require('mongoose')
const  suppliersSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    name:{type:String, trim:true, required:true},
    nationalId:{type:String, trim:true, required:true},
    image:{type:String, default:null},
    phone:{type:Number, default:0},
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error('invalid email')
        }
    },
    reviews:[
        {
            // rate:{
            //     type:String,
            //     required:true
            // },
            details:{
                type:String
            },
            userId:{
                type: mongoose.Schema.Types.ObjectId,
                required:true,
            }
        }
    ]
    },
    {timestamps:true}
    )

const Suppliers = mongoose.model('Suppliers', suppliersSchema)
module.exports = Suppliers