const fs = require('fs')
const chalk = require('chalk')

const loadTasks = () =>{
    try{
        const Tasks = JSON.parse(fs.readFileSync('tasks.json'))
        return Tasks
    }
    catch(e){
        return []
    }
}
const saveNotes = (tasks)=>{
    fs.writeFileSync('tasks.json', JSON.stringify(tasks))
}
const addTask = (title, content) => {
    const tasks = loadTasks()
    const searchVal = tasks.find(task=> task.title==title)
    if(!searchVal){
        tasks.push({
            title: title,
            content: content,
            status: false
        })
        saveNotes(tasks)  
        console.log(chalk.blue.inverse('task added successfuly'))  
    }
    else {
        console.log(chalk.red.inverse('task title used before'))
    }
}
const deleteTask = (title) =>{
    const tasks = loadTasks()
    const tasksAfterDelete = tasks.filter( task => task.title!==title )
    if(tasks.length > tasksAfterDelete.length){
        saveNotes(tasksAfterDelete)
        console.log(chalk.red.inverse('task deleted'))    
    }
    else{
        console.log(chalk.red.inverse('task not found'))
    }
}
const editTask = (title, newTitle, newContent) =>{
    const tasks = loadTasks()
    const index = tasks.findIndex(task=> task.title == title)
    if(index==-1) console.log(chalk.red.inverse('task not found'))
    else{
        tasks[index] = {
            title: newTitle, 
            content: newContent, 
            status:tasks[index].status
        }
        saveNotes(tasks)
        console.log(chalk.blue.inverse('task edited successfully'))
    }
}
const showTasks =() =>{
    const tasks = loadTasks()
    if(tasks.length==0) console.log(chalk.blue.inverse('no tasks yet'))
    else{
        tasks.forEach(task => {
            console.log(chalk.green.inverse(`title: ${task.title} and content: ${task.content}`))
        });
    }
}
const showTask = (title)=>{
    const tasks = loadTasks()    
    const task = tasks.find(task=> task.title==title)
    if(!task) console.log(chalk.red.inverse('task not found'))
    else console.log(chalk.green.inverse(`title: ${task.title} and content: ${task.content}`))

}
const changeStatus = (title)=>{
    const tasks = loadTasks()    
    const index = tasks.findIndex(task=> task.title == title)
    if(index==-1) console.log(chalk.red.inverse('task not found'))
    else{
        tasks[index].status = (Boolean(tasks[index].status) == true)? false : true;
        saveNotes(tasks)
        console.log(chalk.blue.inverse(`status is changed to: ${tasks[index].status}`))
    }
}
module.exports = {
    addTask,
    deleteTask, 
    editTask,
    showTasks,
    showTask,
    changeStatus
}

