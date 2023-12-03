const {userServices, userSession} = require("../services");
const {commonUtils} = require("../utils");


async function updateUser(req, res){

}

async function deleteUser(req, res){
    try{
    
        const email = req.params.user_id;
        const key = req.headers.key;

        const user = await userServices.userGetter({email:email});

        if(commonUtils.validate(key)){
            const deleteResponse = await userServices.deleteUser(user.id);
            userSession.removeUser(user.id);
            res.json({
                message : `successFully Deleted user ${email}`
            });
        }else{
            res.json({
                message :"not authorized to delete"
            });
        }

    } catch(error){
        res.json({
            message :"not authorized to delete"
        });
    }
    
}

async function updatePassword(req, res){
    try{
    
        const email = req.params.user_id;
        const key = req.headers.key;
       
        const user = await userServices.userGetter({email:email});
    
        if(commonUtils.validate(key)){
    
            const updateResp = await userServices.updatePassword({
                email:email,
                oldPassword: req.body.oldPassword,
                newPassword : req.body.newPassword
            });
            if(updateResp === "-1"){
                res.status(400).json({
                    message : `check password user ${email}`
                });
            }else{
                res.json({
                    message : `successFully updated password user ${email}`
                });
            }
           
        }else{
            res.status(400).json({
                message :"not authorized to update"
            });
        }

    } catch(error){
        res.status(500).json({
            message :"SomeThing went wrong"
        });
    }
    
}

function checkUser(token, user){

    try{
        const data = commonUtils.validateToken(token);
        return true;
    }catch(error){
        
    }
}

module.exports = {
    userDeleteController : deleteUser,
    userPasswordController : updatePassword
}