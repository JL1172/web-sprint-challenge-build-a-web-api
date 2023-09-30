// Write your "actions" router here!
const express = require("express");
const ActionData = require("./actions-model");
const { validateActionId, validatePost, validatePut } = require("./actions-middlware");


const router = express.Router();
//get
router.get("/", async (req, res, next) => {
    try {
        const actions = await ActionData.get();
        res.status(200).json(actions)
    } catch (err) { next(err) }
})
//get
//getbyid
router.get("/:id", validateActionId, async (req, res, next) => {
    res.status(200).json(req.action)
})
//getbyid
//post
router.post("/", validatePost, async (req, res, next) => {
    try {
        const postedAction = await ActionData.insert(req.body)
        res.status(201).json(postedAction);
    } catch (err) { next(err) }
})
//post
//put 
router.put("/:id", validateActionId, validatePut, async (req, res, next) => {
    try {
        const updated = await ActionData.update(req.params.id,req.body);
        res.status(200).json(updated);
    } catch (err) { next(err) }
})
//put 


router.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message: error.message,
        customMessage: "error in actions route"
    })
})
module.exports = router;