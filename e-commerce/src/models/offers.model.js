const mongoose = require('mongoose')
const offersSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    title:{type:String, trim:true, required:true},
    details:{type:String, trim:true, required:true},
    image:{type:String, default:null},
    discount:{type:String,default:null},
    expireDate:{type:Number,default:0},
    startDate:{type:Number,default:0},
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

const Offers = mongoose.model('Offers', offersSchema)
module.exports = Offers