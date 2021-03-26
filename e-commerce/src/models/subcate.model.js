const mongoose = require('mongoose')
const subcateSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    name:{type:String, trim:true, required:true},
    phone:{type:Number, default:0},

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

const Subcate = mongoose.model('Subcate', subcateSchema)
module.exports = Subcate