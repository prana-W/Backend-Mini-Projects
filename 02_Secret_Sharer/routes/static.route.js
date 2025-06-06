const express = require('express')
const router = express.Router()

const {handleRootPage, handleLoginPage, handleSignupPage} = require('../controllers/static.controller')

router.get('/', handleRootPage)
router.get('/user/login', handleLoginPage)
router.get('/user/signup', handleSignupPage)

module.exports = router