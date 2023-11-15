class CrudRepository{
    constructor(model){
        this.model = model;
    }

    async create(data){
        try{
            const response = this.model.create(data);
            return response;
        }catch(error){
            throw error;
        }
    }
    
    async destroy(data){
        try{
            const response = this.model.destroy({
                where:{
                    id:data
                }
            });
            return response;
        }catch(error){
            throw error;
        }
    }

    async get(data){
        try{
            const response = this.model.findByPk(data);
            return response;
        }catch(error){
            logger.error(error);
        }
    } 

    async getAll(){
        try{
            const response = this.model.findAll();
            return response;
        }catch(error){
            logger.error(error);
        }
    }

    async update(id, data){
        try{
            const response = this.model.update(data,{
                where:{
                    id:id
                }
            });
            return response;
        }catch(error){
            logger.error(error);
        }
    }

}

module.exports = CrudRepository;