const express = require('express')
const router = express.Router()
const { postEvent } = require('../controllers/events')

router.post('/addEvent', postEvent)

module.exports = router