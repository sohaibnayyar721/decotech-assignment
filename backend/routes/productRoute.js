const express = require('express')
const router = express.Router()
const { postProduct, getProduct, getSingleProduct, deleteProduct, change } = require('../controllers/prodcts')
const {upload} = require('../config/config_Cloudinary')
const {authenticate} = require('../middleware/authenticate')

// router.get('/products', authenticate, getProduct)
router.get('/products', getProduct)
router.get('/products/:id', getSingleProduct)
router.post('/addProducts', upload.array("images", 10) , postProduct)
router.delete('/deleteProducts/:id', deleteProduct)
router.get('/api/products', change)


module.exports = router