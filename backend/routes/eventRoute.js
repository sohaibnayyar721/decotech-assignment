const express = require('express')
const router = express.Router()
const { postEvent } = require('../controllers/events')

router.post('/event', postEvent)

module.exports = router