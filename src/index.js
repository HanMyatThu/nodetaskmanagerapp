const express = require('express')
require('./db/mongoose')

const UserRouter = require('./router/user')
const TaskRouter = require('./router/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(UserRouter)
app.use(TaskRouter)

app.listen(port,()=>{
    console.log('connected to localhost', port)
})

// Json Web token
const jwt = require('jsonwebtoken')

const jwtFunction = async()=>{
    const token = jwt.sign({_id : 'abc123'},'thisismynewcourse',{ expiresIn : '2 days'})
    console.log(token)

    const data = jwt.verify(token, 'thisismynewcourse')
    console.log(data)
}

jwtFunction()




