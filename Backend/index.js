require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const bookRoute = require('./Routes/bookRoute')
const authorRoute = require('./Routes/authorRoute')
const userRoute = require('./Routes/userRoute')
const authRoute = require('./Routes/authRoute')

const app = express()
const port = 3000;

app.use(cors({
  credentials: true,
  origin: true
}))
app.use(express.json())
app.use(cookieParser())

app.use('/books',bookRoute)
app.use('/authors',authorRoute)
app.use('/users',userRoute)
app.use('/auth', authRoute)

main().then(() => console.log("connected")).catch((err) => console.log(err));

app.listen(port ,()=>{
    console.log(`App listening on port ${port}`)
})

async function main() {
    await mongoose.connect(process.env.DB_URL);
}

