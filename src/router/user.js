const express = require('express')

const router = new express.Router()
const User = require('../model/users')

// User routes

router.get('/test',(req,res)=>{
    res.send('this is testing')
})
router.post("/users", async (req, res)=>{
    const user = new User(req.body)
 
     try {
         
         await user.save()
         const token = await user.generateAuthToken()
         res.status(201).send({user,token})
     }catch (e) {
         res.status(400).send(e)
     }
     
 
 //    user.save().then(()=>{
 //     res.status(201).send(user)
 //    }).catch((e)=>{
 //         res.status(400)
 //        res.send(e)
 //    })
 })


router.post('/users/login', async(req,res)=>{
    // first method
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    }catch(e){
        res.status(400).send()
    }
})
 
router.get("/users", async (req,res)=>{
 
     try {
         const users =  await User.find({})
         res.send(users)
     } catch (e){
         res.status(500).send()
     }
     // User.find({}).then((users)=>{
     //     res.send(users)
     // }).catch(()=>{
     //     res.status(500).send()
     // })
 })
 
 // Route parameter
router.get("/users/:id", async(req,res)=>{
    
     try{
         const user = await User.findById(req.params.id)
         if(!user){
             return res.status(404).send()
         } 
         res.send(user)
 
     }catch(e){
         res.status(500).send(e)
     }
 
     // User.findById(req.params.id).then((user)=>{
     //     res.send(user)
     // }).catch(()=>{
     //     res.status(500).send()
     // })
 })
 
router.patch('/users/:id', async(req,res)=>{
     const updates = Object.keys(req.body)
     const fillables = ['name','email','password','age']
     const isValidate = updates.every((update)=>fillables.includes(update))
 
     if(!isValidate){
         return res.status(400).send({error: 'Invalid updates'})
     }
 
     try{

        const user = await User.findById(req.params.id)

        updates.forEach((update)=>user[update] = req.body[update])
        //  const user = await User.findByIdAndUpdate(req.params.id, req.body ,{ new : true, runValidators:true})
         // no user with that id
         if(!user){
             return res.status(404).send()
         }
         res.status(201).send(user)
     }catch(e){
         res.status(400).send(e)
     }
 })
 
router.delete('/users/:id',async(req,res)=>{
     try{
         const user = await User.findByIdAndDelete(req.params.id)
         if(!user) {
             return res.status(404).send()
         }
 
         res.send({info : "scuessfully deleted"})
     }catch(e) {
         res.send(500).send(e)
     }
 })

module.exports = router