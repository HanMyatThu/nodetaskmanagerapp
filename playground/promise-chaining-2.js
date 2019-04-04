require('../src/db/mongoose')

const Task = require('../src/model/tasks')

// // promise chaining
// Task.findByIdAndDelete('5ca5861a2333ff1962cc5784').then((task)=>{
//     console.log(task)
//     return Task.countDocuments({completed : false})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

const deleteTaskAndCount = async (id) =>{
    const task = await Task.findByIdAndDelete({_id : id})
    const count = await Task.countDocuments({completed:false})

    return count
}

deleteTaskAndCount('5ca5856700775718b6825921').then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})