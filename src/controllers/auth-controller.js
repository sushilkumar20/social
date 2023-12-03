const {userServices, userSession} = require("../services");
const crypto = require("crypto");
const { v4: uuidv4 } = require('uuid');
const {commonUtils} = require("../utils");

async function register(req,res){
    try{
        let id = commonUtils.createId(req.body.userName, req.body.email);
        const createdAt =  new Date();
        const updatedAt = createdAt; 
        var data = await userServices.createUser({
            id: id,
            username:req.body.username,
            email:req.body.email,
            password:req.body.password,
            bio: req.body.bio,
            created_at : createdAt,
            updated_at: updatedAt,
            Type: "user",
            location : req.body.location,
            externalLink : req.body.externalLink,
            name : req.body.name
        });
        // const sessionId = uuidv4();
        // userSession.setUser(data.id, sessionId);

        const sessionId = commonUtils.createToken({
            id:data.id,
            userName : data.userName,
            name : data.name,
            email:data.email
        })
        res.json({ message: "success registered" ,
                   user:data,
                   key : sessionId
                });
    }catch(error){
        if (error.name === "SequelizeUniqueConstraintError") {
            res.status(400).json({ message: "Duplicate entry. User already exists." });
          } else {
            console.error("Error during user registration:", error);
            res.status(500).json({ message: "Internal Server Error" });
          }
    }
          
};


async function login(req,res){
    try{
        let data = await userServices.validateUser({
            email:req.body.email,
            password:req.body.password
        });

        if(data == "-1"){
            res.json({
                message : "invalid user-name or password"
            })
        }else{

            // const sessionId = uuidv4();
            // userSession.setUser(data.id, sessionId);

            const sessionId = commonUtils.createToken({
                id:data.id,
                userName : data.userName,
                name : data.name,
                email:data.email
            })
            res.json({
                message :"succeesfully signed",
                data : data,
                key : sessionId
            })
        }
    }catch(error){
        res.json({
            message : "invalid user-name or password"
        })
    }
          
};

async function logout(req,res){
    try{
        const sessionIdFromUser = req.headers.key;
        let data = await userServices.userGetter({email : req.body.email});
        // const sessionId = userSession.getUser(data.id);
        
        if(commonUtils.validate(sessionIdFromUser)){
            userSession.removeUser(data.id);
            res.json({
                message : "Succesfully logged out"
            });
        }else{
            res.json({
                message : "not authorized to perform this"
            })
        }
    }catch(error){
        res.json({
            message : "not authorized to perform this"
        })
    }
          
};

module.exports  = {
    registerController : register,
    loginController  : login,
    logoutController : logout
}