const path = require('path')
const dotenv = require('dotenv')

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

module.exports ={
    PORT : process.env.PORT,
    SALT_ROUND : process.env.SALT_ROUND,
    JWT_EXPIRY : process.env.JWT_EXPIRY,
    JWT_SECRET : process.env.JWT_SECRET
}