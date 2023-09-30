// add middlewares here related to actions
const ActionData = require("./actions-model");
const ProjectData = require("../projects/projects-model");
module.exports = {
    async validateActionId(req, res, next) {
        try {
            const { id } = req.params;
            const validId = await ActionData.get(id);
            if (!validId) {
                next({ status: 404, message: `no project with id ${id} exists` })
            } else {
                req.action = validId;
                next();
            }
        } catch (err) {
            next(err)
        }
    },
    async validatePost(req, res, next) {
        try {
            const {project_id,description,notes} = req.body;
            const isValid = await ProjectData.get(project_id)
            if (!project_id || !description || !notes) {
                next({status : 400, message : "need projectid, description, and notes"})
            } else if (!isValid) {
                next({status : 404, message  : `project with id ${project_id} does not exist`})
            } else {
                next(); 
            }
        } catch (err) { next(err) }
    }
}