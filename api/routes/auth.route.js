const router = require('express').Router()
const authCtrl = require('../controllers/auth.controller')

router.post('/login', authCtrl.login)
router.post('/register', authCtrl.register)
router.post('/logout', authCtrl.logout)
router.post('/reset',  authCtrl.reset)
router.post('/reset-password',  authCtrl.updatePassword)
module.exports = router;