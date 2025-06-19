require('dotenv').config();
const express = require('express')
const cors = require('cors');
const authRoute = require('./routes/authRoute')
const userRoute = require('./routes/userRoute')
const mongoose = require('mongoose')

const app = express()
app.use(cors());
app.use(express.json())

mongoose.connect(process.env.MONGODB_URL)

app.listen(3000, () => { console.log("server listening on port 3000.....") })

app.use("/auth", authRoute)
app.use("/user", userRoute)