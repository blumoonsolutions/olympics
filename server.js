require('dotenv').config()
const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo');

const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(session({
    secret: process.env.SESSIONS_SEC,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.DB_URI, dbName: "sessions" })
}))

app.set('view engine', 'ejs')
app.set('views', 'public/views')

require('./utils/database').connectDB()
require('./api/routes').setRoutes(app)

const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 6500

app.listen(port, console.log(`Server conncected on http://${host}:${port}`))