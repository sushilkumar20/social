const {StatusCodes} = require('http-status-codes');
function validateAuthRequest(req, res, next){
    if(!req.body.email){
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json({
                    message : 'Something went Wrong while authentication',
                    cause  : ' Have valid email'
                })
    }

    if(!req.body.password){
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json({
                    message : 'Something went Wrong while authentication',
                    cause  : ' Have password'
                })
    }

    next();
}

module.exports = {
    validateAuthRequest
}