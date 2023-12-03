const userServices = require("./user-service");
const {FollowerRepository} = require("../repositories");


const followerRepository = new FollowerRepository();

async function follow(data){

    // check if following id is blockked or not
    try{
        followerRepository.create({
            followerId : data.follower.id,
            followingId : data.following.id
        });

        data.follower.Following  = data.follower.Following + 1;
        data.following.Follower  = data.following.Follower + 1;
        userServices.updateUser(data.follower);
        userServices.updateUser(data.following);
    }catch(error){
        throw error;
    }
}

async function unfollow(data){

    // check if following id is blockked or not
    try{
         followerRepository.destroy({
            followerId : data.follower.id,
            followingId : data.following.id
        });
        data.follower.Following  = data.follower.Following - 1;
        data.following.Follower  = data.following.Follower - 1;
        userServices.updateUser(data.follower);
        userServices.updateUser(data.following);
    }catch(error){
        throw error;
    }
}

async function getAllFollower(data){
    try{
        const response = await followerRepository.findAllFollower(data);
        const userResults = []; 

        for(const id of response){
            const userData = await userServices.userGetterById({
                id: id.followerId
            });
            userResults.push(userData);
        }

        console.log(userResults);
        return userResults;
    }catch(error){
        throw error;
    }
}

async function getAllFollowing(data){
    try{
        const response = await followerRepository.findAllFollowing(data);
        const userResults = []; 

        for(const id of response){
            const userData = await userServices.userGetterById({
                id: id.followingId
            });
            userResults.push(userData);
        }

        console.log(userResults);
        return userResults;
    }catch(error){
        throw error;
    }
}

module.exports = {
    follow,
    unfollow,
    getAllFollower,
    getAllFollowing
}