// Write your "actions" router here!
const express = require("express");
const ActionData = require("./actions-model");
const { validateActionId } = require("./actions-middlware");

const router = express.Router();
//get
router.get("/",async(req,res,next)=> {
    try {
        const actions = await ActionData.get();
        res.status(200).json(actions)
    } catch(err) {next(err)}
})
//get
//getbyid
router.get("/:id",validateActionId,async(req,res,next)=> {
    res.status(200).json(req.action)
})
//getbyid

router.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message: error.message,
        customMessage: "error in actions route"
    })
})
module.exports = router;