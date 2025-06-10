const User = require('../models/user.model')
const {encryptPassword, checkPassword} = require('../utils/bcrypt.util')
const {setUser, getUser} = require('../services/auth.service')
const {v4: uuidv4} = require('uuid');

const handleSignupLogic = async (req, res) => {
    try {

        if (!req.body || !req.body.username || !req.body.email || !req.body.password) {
            return res.status(400).render('signup.ejs', {
                errorMess: 'Kindly enter all the fields!'
            })
        }

        const hashedPassword = await encryptPassword(req.body.password);

        console.log(hashedPassword)
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            createdSecretMessages: [],
            receivedSecretMessages: []
        })

        return res.redirect('/user/login')

    } catch (err) {
        return res.status(400).render('signup.ejs', {
            errorMess: err
        })
    }
}

const handleLoginLogic = async (req, res) => {
    try {

        if (!req.body || !req.body.email || !req.body.password) {
            return res.status(400).render('login.ejs', {
                errorMess: 'Kindly enter all the fields!'
            })
        }

        const {isCorrectPassword, user} = await checkPassword(req.body?.email, req.body?.password);

        if (isCorrectPassword) {
            const sessionId = uuidv4();
            res.cookie('uid', sessionId);
            setUser(sessionId, user)
            return res.redirect('/user/dashboard')
        } else {
            return res.render('login.ejs', {
                errorMess: 'Invalid credentials! Please try again.'
            })
        }


    } catch (err) {
        return res.status(400).render('login.ejs', {
            errorMess: err
        })
    }
}

module.exports = {
    handleSignupLogic, handleLoginLogic
}