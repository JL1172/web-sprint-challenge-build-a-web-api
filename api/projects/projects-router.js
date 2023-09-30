// Write your "projects" router here!
const express = require("express");
const ProjectData = require("./projects-model");
const {validateProjectId} = require("./projects-middleware");

const router = express.Router();

//get
router.get("/",async(req,res,next)=>{
    try {
        const project = await ProjectData.get();
        res.status(200).json(project)
    } catch (err) {next(err)}
})
//get
//getbyid
router.get("/:id",validateProjectId, async(req,res,next)=> {
    res.status(200).json(req.user);
})
//getbyid


router.use((error,req,res,next)=> {
    res.status(error.status || 500).json({
        message : error.message,
        customMessage  : "error in projects route"
    })
})
module.exports = router;