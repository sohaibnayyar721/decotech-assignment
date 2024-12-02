const express = require('express')
const router = express.Router()
const { signIn, signUp } = require('../controllers/user')


router.post('/login', signIn)
router.post('/signUp', signUp)


module.exports = router