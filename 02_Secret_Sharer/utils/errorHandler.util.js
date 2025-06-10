const errorHandlerUtil = (res, code = 69, message = 'Something went wrong!', error = 'idk') => {
    return res.render('errorPage', {
        errorObj : {
            statusCode: code,
            errorMessage: message,
            err: error
        }
    })
}

module.exports = errorHandlerUtil