const mongoose = require('mongoose')
const categoriesSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    name:{type:String, trim:true, required:true},
    image:{type:String, default:null},
    reviews:[
       // {
            // rate:{
            //     type:String,
            //     required:true
            // },
            //details:{
                //type:String
           // },
            //userId:{
            //    type: mongoose.Schema.Types.ObjectId,
          //      required:true,
        //    }
      //  }
   ]
    },
    {timestamps:true}
    )

const Categories = mongoose.model('categories', categoriesSchema)
module.exports = Categories