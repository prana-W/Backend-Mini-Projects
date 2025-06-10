const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const salt = 10;

const encryptPassword = async (password) => {

    try {

        await bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
                console.log('There was an error while hashing the password', err);
                return err;
            }
            return hash;
        })

    } catch (error) {

        console.log('There was an error while encrypting the password', error);
        return error;

    }

}

const checkPassword = async (email, password) => {
    try {

        //todo: check if exec() is working fine
        const user = await User.findOne({email}).exec()
        if (!user) {
            throw new Error(`User doesn't exist: ${email}`);
        }
        return await bcrypt.compare(password, user.password);

    } catch (err) {
        return err;
    }
}

module.exports = {
    encryptPassword,
    checkPassword
}