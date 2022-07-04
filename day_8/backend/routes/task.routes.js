const {Router} = require("express")
const TaskModel = require("../models/Task")
const taskRouter = Router();
require("dotenv").config()

taskRouter.get("/:userId/tasks", async (req, res) => {
    const userId = req.params.userId
    const tasks = await TaskModel.find({userId})
    res.send(tasks)
})

taskRouter.post("/:userId/tasks", async (req, res) => {
    const userId = req.params.userId
     
    let payload = {
        ...req.body,
        userId
    }
    const task = await new TaskModel(payload)
    task.save((err, success) => {
        if(err){
            return res.status(500).send({message : "something went wrong"})
        }
        return res.status(201).send(success)
    })
})
 taskRouter.delete("/:ID/tasks", async(req,res)=>{
    const ID = req.params.ID
    res.setHeader("content-type","application/json")
    try {
        await TaskModel.deleteOne({_id:ID})
         console.log(TaskModel)
        return res.status(200).json("delete success")
    } catch(error){
        res.status(409).json(error) 
    }
 })
module.exports = taskRouter;

