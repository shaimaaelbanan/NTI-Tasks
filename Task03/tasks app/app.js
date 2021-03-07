const yargs = require('yargs')
const chalk = require('chalk')
const tasks = require('./tasks')
//add task command
yargs.command({
    command:'add',
    describe:"add new task",
    builder:{
        title:{
            type: 'string',
            demandOption:true,
            describe:'task title'
        },
        content:{
            type: 'string',
            demandOption:true,
            describe:'task content'
        }
    },
    handler: function(argv){
        tasks.addTask(argv.title, argv.content)
    }
})

//delete task command
yargs.command({
    command:'del',
    describe:'delete task using task title as search key',
    builder:{
        title:{
            type:'string',
            describe:'task title',
            demandOption:true
        }
    },
    handler:function(argv){
        tasks.deleteTask(argv.title)
    }
})
//edit task command
yargs.command({
    command:'edit',
    describe:'edit task using task title as search key',
    builder:{
        title:{
            type:'string',
            describe:'task title',
            demandOption:true
        },
        newTitle:{
            type:'string',
            describe:'task new title',
            demandOption:true
        },
        newContent:{
            type:'string',
            describe:'task new content',
            demandOption:true
        }
    },
    handler:function(argv){
        tasks.editTask(argv.title, argv.newTitle, argv.newContent)
    }
})
//show all tasks
yargs.command({
    command:'showAll',
    describe: 'show all data for our tasks',
    handler: function(){
        tasks.showTasks()
    }
})
//show single task
yargs.command({
    command:'showTask',
    describe: 'show  data for one tasks',
    builder:{
        title:{
            type:'string',
            demandOption:true,
            describe:'task title'
        }
    },
    handler: function(argv){
        tasks.showTask(argv.title)
    }
})
yargs.command({
    command:'changeStatus',
    describe: 'change task status',
    builder:{
        title:{
            type:'string',
            demandOption:true,
            describe:'task title'
        }
    },
    handler: function(argv){
        tasks.changeStatus(argv.title)
    }
})

yargs.parse()