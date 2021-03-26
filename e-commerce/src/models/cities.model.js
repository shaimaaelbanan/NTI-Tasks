const mongoose = require('mongoose')
const citiesSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    name:{type:String, trim:true, required:true},
    lat:{type:String, trim:true, required:true},
    long:{type:String, default:null},
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

const Cities = mongoose.model('cities', citiesSchema)
module.exports = Cities