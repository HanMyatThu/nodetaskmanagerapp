const mongoose = require('mongoose')
const validator = require('validator')

// User Model
const User = mongoose.model('users',{
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
        }
       
    })
    

module.exports = User