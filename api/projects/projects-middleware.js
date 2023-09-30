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
                req.proj = validId; 
                next();
            }
        } catch (err) {   
            next(err)
        }
    },
    async validatePost(req,res,next) {
        try {
            const {name,description} = req.body;
            if (!name || !description) {
                next({status : 400})
            } else {
                next(); 
            }
        } catch (err) {next(err)}
    },
    async validatePut(req,res,next) {
        try {
            const {name,description,completed} = req.body;
            if (!name || !description || completed === undefined) {
                next({status : 400})
            } else {
                next(); 
            }
        } catch (err) {next(err)}
    }
}