const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// Scheme
const UserSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        trim : true
    },
    email : {
        type : String,
        required: true,
        trim : true,
        lowercase : true,
        unique : true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error ('Enter Email')
            }
        }
    },
    password:{
        type: String,
        trim: true,
        required: true,
        minlength: 7,
        validate(value) {
            if(value.toLowerCase().includes('password')) {
                throw new Error('passowrd cannot contain password' )
            }
        }

    },
    age: {
        type : Number,
        default : 0,
        validate(value) {
            if(value < 0){
                throw new Error('Age must be a positive number')
            }
        }
    },
    tokens : [{
        token : {
            type : String,
            required : true
        }
    }]
   
})
// jwt instance method , object ko access ma ya woo
UserSchema.methods.generateAuthToken = async function() {
    const user = this

    const token = jwt.sign({ _id : user._id.toString() }, 'thisismynewcourse',{ expiresIn : '2 days'})

    user.tokens = user.tokens.concat({
        token
    })
    await user.save()

    return token
}


// object ko access ya dl
UserSchema.statics.findByCredentials = async(email,password)=>{
    const user = await User.findOne({ email })

    if(!user){
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch) {
        throw new Error('Different Credientials')
    }
    return user
}


// use standard function hash the password before saving
UserSchema.pre('save', async function(next) {
    const user = this

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password,8)
    }

    next()
})


// User Model
const User = mongoose.model('users', UserSchema)
    

module.exports = User