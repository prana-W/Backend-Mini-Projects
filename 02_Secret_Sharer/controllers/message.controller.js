const errorHandler = require('../utils/errorHandler');
const Message = require('../models/message.model');
const bcrypt = require('bcrypt');

const handleMessagePage = async (req, res) => {
    try {

        return res.render('generate-secret')

    } catch (err) {
        errorHandler(res, 400, 'Error while fetching message page', err);
    }
}

const handlePostMessage = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body?.password, 10)
    try {
        await Message.create({
            title: req.body?.title,
            message: req.body?.message,
            password: hashedPassword,
            maxAllowedViews: req.body?.maxAllowedViews,
            expiresIn: req.body?.expiresIn,
            createdBy: req.user?._id | Date.now()
        })

        return res.redirect('/')

    } catch (err) {
        errorHandler(res, 400, 'Error while posting message', err);
    }
}

module.exports = {
    handleMessagePage,
    handlePostMessage
}