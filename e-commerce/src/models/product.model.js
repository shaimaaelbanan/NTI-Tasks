const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
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

const Product = mongoose.model('Product', productSchema)
module.exports = Product