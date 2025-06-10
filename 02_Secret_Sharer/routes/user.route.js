const router = require('express').Router();
const {handleSignupLogic, handleLoginLogic} = require('../controllers/user.controller');

router.route('/signup')
    .get((req, res) => {
        return res.render('signup');
    })
    .post(handleSignupLogic)

router.route('/login')
    .get((req, res) => {
        return res.render('signup');
    })
    .post(handleLoginLogic)

module.exports = router;