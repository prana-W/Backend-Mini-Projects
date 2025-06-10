const errorHandler = require('../utils/errorHandler.util');
const Message = require('../models/message.model');
const {encryptPassword} = require('../utils/bcrypt.util');

const handleMessagePage = async (req, res) => {
    try {

        return res.render('generate-secret')

    } catch (err) {
        errorHandler(res, 400, 'Error while fetching message page', err);
    }
}

const handlePostMessage = async (req, res) => {

    try {

        const hashedPassword = await encryptPassword(req.body?.password);

        await Message.create({
            title: req.body?.title,
            message: req.body?.message,
            password: hashedPassword,
            maxAllowedViews: req.body?.maxAllowedViews,
            expiresIn: req.body?.expiresIn,
            createdBy: req.user?._id | Date.now()
        })

        return res.status(200).redirect('/')

    } catch (err) {
        errorHandler(res, 400, 'Error while posting message', err);
    }
}

module.exports = {
    handleMessagePage,
    handlePostMessage
}