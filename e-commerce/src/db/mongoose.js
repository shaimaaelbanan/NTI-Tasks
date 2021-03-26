const mongoose = require('mongoose')
try{
    mongoose.connect(process.env.MONGODB_NAME, {
    useCreateIndex:true,
    useFindAndModify:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
})
}
catch(e){
    console.log(e)
}
