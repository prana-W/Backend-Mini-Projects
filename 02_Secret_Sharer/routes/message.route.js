const express = require('express');
const router = express.Router();

const {handleMessagePage, handlePostMessage} = require('../controllers/message.controller');

router.route('/')
    .get(handleMessagePage)
    .post(handlePostMessage)

module.exports = router;