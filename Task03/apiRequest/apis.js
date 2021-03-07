// with request

// const request = require('request')
// const chalk = require('chalk')
// const showApi = (name,id)=>{
//     const getdata = (api, callback)=>{
//         if(api=='posts') url = 'https://jsonplaceholder.typicode.com/posts'
//         else if(api=='albums') url ='https://jsonplaceholder.typicode.com/albums'        
//         request({ url , json:true }, (error, {body})=> {
//             if(error) callback('error in api service', false)
//             else if(body.error) callback('error inside api body', false)
//             else callback(false, body)
//         })
//     }
//     getdata(name,(error, result)=>{
//         if(error) console.log(error)
//         else if (!id) console.log(result)
//         else{
//         const element = result.find(res=> res.id==id)
//         if(!element) console.log(chalk.red.inverse('element not found'))
//         else console.log(element)
//         }
//     })    
// }

// module.exports = {showApi}




//with https

const https = require('https')
const chalk = require('chalk')

const showApi = (name,id)=>{
const url = {"posts":"https://jsonplaceholder.typicode.com/posts","albums":"https://jsonplaceholder.typicode.com/albums"}
const myRequest = https.request(url[name], (response)=>{
    let data = '' 
    response.on('data', (chunk)=>{
        data = data + chunk.toString()
    })
    response.on('end',()=>{
        const body = JSON.parse(data)
        if(!id){
            console.log(body)
        }else{
            const element = body.find(ele=> ele.id==id)
            if(!element) console.log(chalk.red.inverse('element not found'))
            else console.log(element)
        }
    })
})
myRequest.on('error', (error)=>console.log('error'))
myRequest.end()
}

module.exports = {showApi}