const mongoose = require('mongoose')
const regionsSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    title:{type:String, trim:true, required:true},
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

const Regions = mongoose.model('Regions', regionsSchema)
module.exports = Regions