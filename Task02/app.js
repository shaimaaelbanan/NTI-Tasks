const yargs = require("yargs");
const chalk = require('chalk')
const myMethods = require('./myFunctions')
yargs.command({
    command: 'addCustomer',
    describe:'add new customer',
    builder:{
        name:{
            type:'string', 
            demandOption:true
        },
        balance:{
            type:'number', 
            demandOption:true  
        }
    },
    handler:function(argv){
        let customer = {name:argv.name, balance:argv.balance}
        myMethods.addNewCustomer(customer)
    }
})

yargs.command({
    command:'showCustomer',
    builder: {
        id:{type:'number', demandOption:true}
    },
    handler:function(argv){
        myMethods.showCustomer(argv.id)
    }
})
yargs.command({
    command:'delCustomer',
    builder: {
        id:{type:'string', demandOption:true}
    },
    handler:function(argv){
        myMethods.deleteCustomer(argv.id)
    }
})
yargs.command({
    command:'addBalance',
    builder:{
        id:{type:'number', demandOption:true},
        addBalance:{type:'number', demandOption:true}
    },
    handler:function(argv){
        myMethods.addBalance(argv.id, argv.addBalance)
    }
})

yargs.argv