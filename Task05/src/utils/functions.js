const {MongoClient,ObjectID} = require('mongodb')

const dbConnection = (callback)=>{
    MongoClient.connect(process.env.dbConnectionUrl,{useNewUrlParser:true,useUnifiedTopology:true},(error,client)=>{
        if(error) {return console.log('Error in db connection')}
        const db = client.db(process.env.dbName)
        callback(db)
    })
}

//add user inside db
const addUser = (userData) =>{
    dbConnection(db=>{
        db.collection('user').insertOne(userData, (error, response)=>{
            console.log(response)
        })
    })
}
//show all users
const showAll = (cb) =>{
    dbConnection(db=>{
        db.collection('user').find().toArray((err,res)=>{
            if(err) cb('error',false)
            else cb(false, res)
        })
    })
    
}
//show single user
const showSingle = (id, cb)=>{
    dbConnection(db=>{
        db.collection('user').findOne({_id: new ObjectID(id)}, (err,res)=>{
            if(err) cb('error', false)
            else cb(false, res)
        })
    })
}
//delete user
const deleteUser= (userId)=>{
    dbConnection(db=>{
        db.collection('user').deleteOne({_id:new ObjectID(userId)})
    })
}
//edit user
const editUser = (id,name,email,phone,msg)=>{
    dbConnection(db=>{ 
        db.collection('user').updateOne({ _id: new ObjectID(id)},{
            $set:{
                name:name,
                email:email,
                phone:phone,
                msg:msg
            }
        }).then(response=>console.log(response.ops))
        .catch(err=>console.log(err))
    })
};

module.exports = {addUser, showAll, deleteUser, showSingle, editUser}