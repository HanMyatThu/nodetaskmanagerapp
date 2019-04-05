const express = require('express')
const router = new express.Router()
const Task = require('../model/tasks')

// Task Post
router.post("/tasks", async (req,res)=>{
    const task = new Task(req.body)

    try{
        await task.save()
        res.status(201).send(task)
    }catch(e) {
        res.status(500).send(e)
    }
    // task.save().then(()=>{
    //     res.status(201).send(task)
    // }).catch((e)=>{
    //     res.status(400)
    //     res.send(e)
    // })
})

router.get('/tasks', async(req,res)=>{

    try{
        const tasks = await Task.find({})
        res.status(201).send(tasks)
    }catch (e){ 
        res.status(500).send(e)
    }
    // Task.find({}).then((tasks)=>{
    //     res.send(tasks)
    // }).catch((e)=>{
    //     res.status(500).send()
    // })
})

router.get('/tasks/:id', async(req,res) =>{

    try{
        const task = await Task.findById(req.params.id)
        if(!task) {
            return res.status(404).send()
        }

        res.status(201).send(task)
    }catch(e){
        res.status(500).send(e)
    }
    // Task.findById(req.params.id).then((task)=>{
    //     res.send(task)
    // }).catch(()=>{
    //     res.status(500).send()
    // })
})

router.patch('/tasks/:id', async (req,res)=>{
    const updates = Object.keys(req.body)
    const fillables = ['description','fillables']
    const isValidate = updates.every((update)=>fillables.includes(update))

    if(!isValidate){
        return res.send({ Error : 'Invalide update'})
    }

    try{
        
        const task = await Task.findById(req.params.id)
        updates.forEach((update) => task[update] = req.body[update] );
        await task.save()
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        //     new : true,
        //     runValidators: true
        // })
        if(!task){
            return res.status(400).send()
        }
        
        res.send(task)
    }catch(e) {
        res.status(500).send(e)
    }
})

router.delete('/tasks/:id', async (req,res)=>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task) {
            return res.status(404).send()
        }

        return res.send({info : "successfully deleted"})
    }catch(e){
        return res.status(500).send(e)
    }
})


module.exports = router