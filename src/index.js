const express = require('express')
require('./db/mongoose')

const UserRouter = require('./router/user')
const TaskRouter = require('./router/task')

const app = express()
const port = process.env.PORT || 3000


// middle ware
// app.use((req,res,next)=>{
//     if(req.method == 'GET'){
//         res.send('GET request are disabled')
//     }else {
//         next()
//     }
// })

// app.use((req,res,next)=>{
//     res.status(500).send("Site is currently under construction.")
// })


app.use(express.json())
app.use(UserRouter)
app.use(TaskRouter)


// Without middleware : new request-> run router hanadler

// with middleware: new request-> do sth -> run router handler

app.listen(port,()=>{
    console.log('connected to localhost', port)
})

// express ka res.send( ) mr json ko stringnify lote pay dl

// const pet = {
//     name: 'Hal'
// }

// pet.toJSON = function () {
//     console.log(this)
//     return this
// }
// console.log(JSON.stringify(pet))

// testing relationship 
const Task = require('./model/tasks')
const User = require('./model/users')

const main = async () => {
    // const task = await Task.findById('5caec1056bd31e1f7e21d9e2')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)
    const user = await User.findById('5caebf295c8b7e1d29e1400c')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)

}
main()