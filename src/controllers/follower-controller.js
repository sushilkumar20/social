const {followService, userSession, userServices} = require("../services");
const{commonUtils} = require("../utils");

async function getAllFollower(req,res){
   
    const email = req.params.user_id;
    try{
        const user  =  await userServices.userGetter({
            email:email,
        })

        const allFollower = await followService.getAllFollower(user.id);
        
        return res.json({
            message : "succesfully got",
            follower : allFollower
        })
    }catch(error){
        res.status(500).json({message : "Something went wrong"});
    }
    
} 

async function getAllFollowing(req,res){

    const email = req.params.user_id;
    
    try{
        const user  =  await userServices.userGetter({
            email:email,
        })

        
        const allFollowering = await followService.getAllFollowing(user.id);

        return res.json({
            message : "succesfully got all follower",
            follower : allFollowering
        })
    }catch(error){
        console.log(error);
        res.status(500).json({message : "Something went wrong"});
    }
    
} 

async function follow(req,res){

    const email = req.params.user_id;
    const followerEmail = req.body.followerEmail;
    const key = req.headers.key;

    try{
        const user  =  await userServices.userGetter({
            email:email,
        })

        if(commonUtils.validate(key)){
            const userToFollow  =  await userServices.userGetter({
                email:followerEmail,
            })


            if(userToFollow == undefined || userToFollow == -1){
                res.status(400).json({
                    message :"user doesnot exist"
                })
            }else{
                const response = await followService.follow({
                    follower : user,
                    following : userToFollow
                });

                
                res.json({
                    message : "succesfully followed",
                    data : response
                })
            }
        }else{
            res.status(400).json({
                message : "not authorized to follow"
            });
        }

        
    }catch(error){
        console.log(error);
        res.status(500).json({message : "Something went wrong"});
    }
    
} 

async function unfollow(req,res){

    const email = req.params.user_id;
    const followerEmail = req.body.followerEmail;
    const key = req.headers.key;

    try{
        const user  =  await userServices.userGetter({
            email:email,
        })

        if(commonUtils.validate(key)){
            const userToFollow  =  await userServices.userGetter({
                email:followerEmail,
            })
    
            if(userToFollow == undefined || userToFollow == -1){
                res.status(400).json({
                    message :"user doesnot exist"
                })
            }else{
                const response = await followService.unfollow({
                    followerId : user,
                    followingId : userToFollow
                });
    
                res.json({
                    message : "succesfully followed",
                    data : response
                })
            }
        }else{
            res.status(400).json({
                message : "not authorized to follow"
            });
        }

        
    }catch(error){
        console.log(error);
        res.status(500).json({message : "Something went wrong"});
    }
    
} 

module.exports = {
    followerController : getAllFollower,
    followingController : getAllFollowing,
    followController : follow,
    unfollowController : unfollow
}
