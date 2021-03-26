const mongoose = require('mongoose')
const ordersSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    title:{type:String, trim:true, required:true},
    details:{type:String, trim:true, required:true},
    image:{type:String, default:null},
    numOfBuys:{type:Number, default:0},
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

const Orders = mongoose.model('Orders', ordersSchema)
module.exports = Orders