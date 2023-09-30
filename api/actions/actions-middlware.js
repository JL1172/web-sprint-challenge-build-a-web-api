// add middlewares here related to actions
const ActionData = require("./actions-model");
module.exports = {
    async validateActionId(req,res,next) {
        try {
            const {id} = req.params;
            const validId = await ActionData.get(id);
            if (!validId) {
                next({status : 404, message : `no project with id ${id} exists`})
            } else {
                req.action = validId; 
                next();
            }
        } catch (err) {   
            next(err)
        }
    },
}