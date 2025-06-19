require('dotenv').config()
const express = require('express')
const userRoute = express.Router()

const jwt_secret = process.env.JWT_SECRET

userRoute.post('/me', async (req, res) => {
    const { token } = req.body
    
    
})

module.exports = userRoute