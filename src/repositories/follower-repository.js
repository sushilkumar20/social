const CrudRepository = require("./crud-repository");
const {follower} = require("../models");
class FollowerRepository extends CrudRepository{
    constructor(){
        super(follower);
    }

    async destroy(data){
        try{
            const response = this.model.destroy({
                where:{
                    followerId:data.followerId,
                    followingId:data.followingId
                }
            });
            return response;
        }catch(error){
            throw error;
        }
    }

    async findAllFollowing(id){
        try{
            console.log(this.model);
            const response = this.model.findAll({
                attributes: ['followingId'],
                where:{
                    followerId:id,
                }
            });
            return response;
        }catch(error){
            throw error;
        }
    }

    async findAllFollower(id){
        try{
            console.log(this.model);
            const response = this.model.findAll({
                attributes: ['followerId'],
                where:{
                    followingId:id,
                }
            });
            return response;
        }catch(error){
            throw error;
        }
    }
}

module.exports = FollowerRepository;