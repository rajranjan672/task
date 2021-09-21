const express = require('express')
require('../db/mongoose')
const User = require('../models/user')
const router = express.Router()

router.post('/users', (req, res) => {
    const user = new User(req.body)
    user.save().then(() => {
        res.send(user)
    })
})

router.get('/users/:id', (req, res) =>{
    const _id =req.params.id
    User.findById(_id).then((user) => {
        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    })
})

router.get('/users', (req,res) => {
    User.find({}).then((users) => {
        res.send(users)
    })
})
router.post('/users/login', async(req, res) => {
   
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.getSignedjwt()
    res.send(token)
})