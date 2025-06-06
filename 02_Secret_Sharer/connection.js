const mongoose = require('mongoose');

const connectDB = async (uri) => {

    try {
        await mongoose.connect(uri);
        console.log('✅ Connected to MongoDB!');

    } catch (error) {
        console.log(`❌ Error connecting to MongoDB: ${error.message}`);
    }
}


module.exports = connectDB