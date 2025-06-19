const express = require('express')
const authRoute = express.Router()

authRoute.post('/signup', async (req, res) => {
    const body = req.body
     
})

authRoute.post('/signin', async (req, res) => {
    
})

module.exports = authRoute