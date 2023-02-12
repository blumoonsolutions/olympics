const  jwt = require('jsonwebtoken')

const router = require('express').Router()

router.get('/', (req,res) => {
    res.render('pages/home')
})
router.get('/login', (req,res) => {
    console.log(req.session)
    res.render('pages/login')
})
router.get('/register', (req,res) => {
    res.render('pages/register')
})
router.get('/recovery', (req,res) => {
    res.render('pages/recovery')
})
router.get('/reset-password', (req,res) => {
    req.session.token = req.query.token
    res.render('pages/forgot')
})
router.get('/dashboard', (req,res) => {
    res.render('pages/dashboard')
})
router.get('/error', (req,res) => {
    res.render('pages/error')
})
module.exports = router;