// Write your "projects" router here!
const express = require("express");
const ProjectData = require("./projects-model");
const { validateProjectId, validatePost, validatePut } = require("./projects-middleware");

const router = express.Router();

//get
router.get("/", async (req, res, next) => {
    try {
        const project = await ProjectData.get();
        res.status(200).json(project)
    } catch (err) { next(err) }
})
//get
//getbyid
router.get("/:id", validateProjectId, async (req, res, next) => {
    res.status(200).json(req.proj);
})
//getbyid
//post
router.post("/", validatePost, async (req, res, next) => {
    try {
        const newProject = await ProjectData.insert(req.body);
        res.status(201).json(newProject); 
    } catch (err) {
        next(err)
    }
})
//post
//put
router.put("/:id",validateProjectId,validatePut,async(req,res,next)=> {
    try {
        const updatedPost = await ProjectData.update(req.params.id,req.body);
        res.status(200).json(updatedPost)
    } catch (err) {
        next(err)
    }
})
//put
//delete 
router.delete("/:id",validateProjectId,async(req,res,next)=> {
    try {
        const deletedProj = await ProjectData.remove(req.params.id);
        res.status(200).json(deletedProj); 
    } catch (err) {
        next(err)
    }
})
//delete 
//get all actions that exists within a project with an id of id
router.get("/:id/actions",validateProjectId,async(req,res,next)=> {
    try {
        const actionOfProject = await ProjectData.getProjectActions(req.params.id);
        res.status(200).json(actionOfProject); 
    } catch(err) {
        next(err);
    }
})
//get all actions that exists within a project with an id of id


router.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message: error.message,
        customMessage: "error in projects route"
    })
})
module.exports = router;