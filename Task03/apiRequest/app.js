const yargs = require('yargs')
const chalk = require('chalk')
const apis = require('./apis')

//show api
yargs.command({
    command:'show',
    describe: 'show api',
    builder:{
        name:{
            type:'string',
            demandOption:true,
            describe:'element id'
        },
        id:{
            type:'number',
            describe:'element id'
        }
    },
    handler: function(argv){
        apis.showApi(argv.name,argv.id)
    }
})

yargs.argv