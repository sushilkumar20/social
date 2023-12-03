const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const {serverConfig} = require("../config");
function createId(userName, email){
    const dataToHash = userName + email;
    const hash = crypto.createHash('sha256');
    hash.update(dataToHash);
    return hash.digest('hex');
}

function createToken(input){
    try{
        return jwt.sign(input, serverConfig.JWT_SECRET, {expiresIn : serverConfig.JWT_EXPIRY});
    }catch(error){
        console.log(error);
        throw error;
    }
}

function validateToken(token){
    try{
       return jwt.verify(token, serverConfig.JWT_SECRET);
    }catch(error){
        throw error;
    }
}
function validate(token){
    try{
       validate(token);
       return true;
     }catch(error){
         return false;
     }
}
module.exports = {
    createId,
    createToken,
    validateToken,
    validate
}