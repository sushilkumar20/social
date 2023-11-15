const {UserRepository} = require("../repositories");
const crypto = require("crypto");

const userRepository = new UserRepository();

async function createUser(data){
    try{
        const response = userRepository.create(data);
        return response;
    }catch(error){
        throw error;
    }
}

async function validateUser(data){
    try{
        const usersData = await userRepository.getUserDataByemail(data.email);
        if(usersData.length >0){
            let user = usersData[0].dataValues;
            if(validatePassword(data.password, user.password)){
                return user;
            }else{
                return "-1";
            }
        }else{
            return "-1";
        }
    
    }catch(error){
        throw error;
    }
}

async function userGetter(data){
    try{
        const usersData = await userRepository.getUserDataByemail(data.email);
        if(usersData.length >0){
            let user = usersData[0].dataValues;
            return user;
        }else{
            return "-1";
        }
    
    }catch(error){
    
        throw error;
    }
}

async function userGetterById(data){
    try{
        const usersData = await userRepository.get(data.id);
       return usersData;
    
    }catch(error){
    
        throw error;
    }
}

async function updateUser(data){
    try{
        const usersData = await userRepository.getUserDataByemail(data.email);
        if(usersData.length >0){
            let user = usersData[0].dataValues;
        
            const updateResponse = await userRepository.update(user.id,{
                id:id,
                username:req.body.username,
                email:req.body.email,
                password:hashedPassword(req.body.password),
                bio: req.body.bio,
                created_at : createdAt,
                updated_at: updatedAt,
                Type: "user"
            })
        }else{
            return "-1";
        }
    }catch(error){
        throw error;
    }
}

async function updatePassword(data){
    try{
        const user = await userGetter({email : data.email});

        if(!validatePassword(data.oldPassword, user.password)){
            return "-1";
        }else{
            const date = new Date();
            const response = await userRepository.update(user.id,{
                password : hashPassword(data.newPassword)
            })

            return response;
        }
    }catch(error){
        throw error;
    }
}

async function deleteUser(data){
    try{
        const deleteResponse = await userRepository.destroy(data);  
        return deleteResponse;  
    }catch(error){
        throw error;
    }
}


function validatePassword(passwordFromUser, passwordStored){
    const dataToHash = passwordFromUser;
    const hash = crypto.createHash('sha256');
    hash.update(dataToHash);
    return hash.digest('hex') === passwordStored;
}

function hashPassword(passwordFromUser){
    const dataToHash = passwordFromUser;
    const hash = crypto.createHash('sha256');
    hash.update(dataToHash);
    return hash.digest('hex');
}
module.exports = {
    createUser,
    validateUser,
    userGetter,
    deleteUser,
    updatePassword,
    userGetterById
}