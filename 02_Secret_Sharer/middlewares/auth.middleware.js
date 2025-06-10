const {getUser} = require('../services/auth.service');

const restrictToLoggedInUserOnly = (req, res, next) => {
    const sessionId = req.cookies?.uid;

    const user = getUser(sessionId);

    if (!user) {
        return res.redirect('/user/login');
    }

    req.user = user;

    next()
}

const getCurrentUser = (req, res, next) => {
    const sessionId = req.cookies?.uid;

    const user = getUser(sessionId);

    if (user) {
        req.user = user;
    }
    next()
}

module.exports = {
    restrictToLoggedInUserOnly,
    getCurrentUser
}