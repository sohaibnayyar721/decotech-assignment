const express = require('express')
const router = express.Router()
const { postEvent, getEvent } = require('../controllers/events')

router.post('/addEvent', postEvent)
router.get('/getEvent', getEvent)

module.exports = router