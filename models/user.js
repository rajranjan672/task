const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true
    },
    email:{
        type: String,
        unique:true,
        required: true,
        valodate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid email')
            }
        }

    },
    password:{
        type: String,
        minlength:7,
        required: true,
        trim: true
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]
})

userShcema.methods.getSignedjwt = async function() {
    const user = this
    const token =jwt.sign({_id: user._id.toString()}, 'thisis')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}
userShcema.statics.findByCredentials = async(email, password) => {
    const user = await User.findOne({email})
    if(!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare.compare(password, user.password)
    if(!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}
UserSchema.pre('save', async function (next) {
    const user = this
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', UserSchema)

module.exports= User