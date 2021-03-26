const mongoose = require('mongoose')
const addressSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    building:{type:String, trim:true, required:true},
    street:{type:String, trim:true, required:true},
    floor:{type:String, default:null},
    flat:{type:String, trim:true, required:true},
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

const Address = mongoose.model('Address', addressSchema)
module.exports = Address