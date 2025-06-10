const handleRootPage = (req, res) => {
    return res.render('home')
}

const handleLoginPage = (req, res) => {
    return res.render('login');
}

const handleSignupPage = (req, res) => {
    return res.render('signup');
}

module.exports = {
    handleRootPage,
    handleLoginPage,
    handleSignupPage
}