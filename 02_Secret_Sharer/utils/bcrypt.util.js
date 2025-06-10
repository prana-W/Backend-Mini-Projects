const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const salt = 10;

const encryptPassword = async (password) => {

    try {

        return await bcrypt.hash(password, salt)

    } catch (error) {

        console.log('There was an error while encrypting the password', error);
        return error;

    }

}

// returns true and user if password matches, false and null otherwise
const checkPassword = async (email, password) => {
    try {

        //todo: check if exec() is working fine
        const user = await User.findOne({email}) || null;
        if (!user) {
            throw new Error(`User doesn't exist: ${email}`);
        }
        return {
            isCorrectPassword: await bcrypt.compare(password, user.password),
            user: user
        };
    } catch (err) {
        return err;
    }
}

module.exports = {
    encryptPassword,
    checkPassword
}