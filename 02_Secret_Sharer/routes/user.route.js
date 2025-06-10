const router = require('express').Router();
const {handleSignupLogic, handleLoginLogic} = require('../controllers/user.controller');

router.post('/signup', handleSignupLogic)
router.post('/login', handleLoginLogic)

module.exports = router;