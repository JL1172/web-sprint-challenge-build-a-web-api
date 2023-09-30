// add middlewares here related to projects
const ProjectData = require("./projects-model");

module.exports = {
    async validateProjectId(req,res,next) {
        try {
            const {id} = req.params;
            const validId = await ProjectData.get(id);
            if (!validId) {
                next({status : 404, message : `no project with id ${id} exists`})
            } else {
                req.user = validId; 
                next();
            }
        } catch (err) {   
            next(err)
        }
    }
}