const CrudRepository = require("./crud-repository");
const {user} = require("../models");
class UserRepository extends CrudRepository{
    constructor(){
       
        super(user);
    }

    async getUserDataByemail(email){
        try{
            
            const response = await this.model.findAll({
                where:{
                    email:email
                }
            });
            return response;
        }catch(error){
           throw error;
        }
    }
}

module.exports = UserRepository;