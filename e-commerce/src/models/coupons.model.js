const mongoose = require('mongoose')
const couponsSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    details:{type:String, trim:true, required:true},
    type:{type:String,trim:true,required:true},
    image:{type:String, default:null},
    discount:{type:String,default:null},
    expireDate:{type:Number,default:0},
    startDate:{type:Number,default:0},
    maxDiscountValue:{type:Number,default:0},
    minOrderValue:{type:Number,default:0},
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

const Coupons = mongoose.model('Coupons', couponsSchema)
module.exports = Coupons