require('../src/db/mongoose')
const User = require('../src/model/users.js')

// 5ca4ee82cb7e001387b2eb76
User.findByIdAndUpdate('5ca4efa9887f02143ac7ed68',{age: 1}).then((user)=>{
    console.log(user)
    return User.countDocuments({age: 1})
}).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})

const updateAgeAndCount = async(id,age)=>{
    const user = await User.findByIdAndUpdate(id,{ age })
    const count = await User.countDocuments({ age })
    return count 
}

updateAgeAndCount('5ca4efa9887f02143ac7ed68',1).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})