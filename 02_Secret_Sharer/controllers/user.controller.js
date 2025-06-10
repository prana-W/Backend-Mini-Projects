const User = require('../models/user.model')
const {encryptPassword, checkPassword} = require('../utils/bcrypt.util')

const handleSignupLogic = async (req, res) => {
    try {

        if (!req.body || !req.body.username || !req.body.password || !req.body.password) {
            return res.status(400).render('signup.ejs', {
                errorMess: 'Kindly enter all the fields!'
            })
        }

        const hashedPassword = await encryptPassword(req.body?.password);

        await User.create({
            username: req.body?.username, email: req.body?.email, password: hashedPassword
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

        if (await checkPassword()) {
            //todo: store the state of the user and redirect to dashboard
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