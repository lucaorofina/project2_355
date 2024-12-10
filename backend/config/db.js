/**
 * @author Bryan Mejia
 * 
 * @description 
 * - Handling database connection logic, will use this to
 *   connect to Luca's MongoDB instance.
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Database Connection Failed: ', err);
        process.exit(1);
    }
};


module.exports = connectDB;