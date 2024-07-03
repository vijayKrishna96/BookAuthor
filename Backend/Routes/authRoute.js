const express = require('express')
const { login, verifyLogin } = require('../Controllers/authController')
const router = express.Router()

router.post('/login', login )
router.get('/verify',verifyLogin)

module.exports = router
