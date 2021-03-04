const fs = require('fs')
const { find } = require('prelude-ls')
const readFile = function(){
    try{    
        customers = JSON.parse(fs.readFileSync('customers.json').toString())
    }
    catch(e){
        customers = []
    }
    return customers
}
const writeFile = function(customers){
    fs.writeFileSync('customers.json', JSON.stringify(customers))
}
const addNewCustomer=function(customer){
    let customers= readFile()
    customer.id = customers.length+1
    customers.push(customer)
    writeFile(customers)
    console.log('added')
    

}
const showCustomer = function(customerId){
    let customers= readFile()
    index = customers.findIndex(customer=>{
        return customer.id == customerId
    })
    if(index==-1) console.log('customer not found')
    else
    {
        console.log(`customer name: ${customers[index].name} and his balance is: ${customers[index].balance}`)
    }
}
const deleteCustomer = function(customerId){
    let customers = readFile()
    index = customers.findIndex(customer=>{
        return customer.id == customerId
    })
    if(index==-1) console.log('customer not found')
    else
    {
        console.log(`customer name: ${customers[index].name} and his balance is: ${customers[index].balance}`)
        customers.splice(index, 1)
        writeFile(customers)
        console.log('deleted')
    }
}
const addBalance = function(customerId, addBalance){
    let customers = readFile()
    index = customers.findIndex(customer=>{
        return customer.id == customerId
    })
    if(index==-1) console.log('customer not found')
    else
    {
        console.log(`customer name: ${customers[index].name} and his balance is: ${customers[index].balance}`)
        customers[index].balance += addBalance
        writeFile(customers)
        console.log('updated')
        console.log(`customer name: ${customers[index].name} and his balance is: ${customers[index].balance}`)
    }
}

module.exports = {addNewCustomer, showCustomer, deleteCustomer, addBalance}