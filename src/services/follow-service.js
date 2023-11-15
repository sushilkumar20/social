const userServices = require("./user-service");
const {FollowerRepository} = require("../repositories");


const followerRepository = new FollowerRepository();

async function follow(data){

    // check if following id is blockked or not
    try{
        followerRepository.create(data);
    }catch(error){
        throw error;
    }
}

async function unfollow(data){

    // check if following id is blockked or not
    try{
        return followerRepository.destroy(data);
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