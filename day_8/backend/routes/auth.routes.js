const {Router} = require("express")
const UserModel = require("../models/User")
require("dotenv").config()
const authRouter = Router();

authRouter.post("/signup", async(req, res) => {
    console.log(req.body)
    const user = await new UserModel(req.body)
    user.save((err, success) => {
        if(err){
            res.status(500).send({message : "Error occurred"})
        }
        return res.status(201).send({message : "Sign up success", token : 54321})
    });
})

authRouter.post("/login", async (req, res) => {
    console.log(req.body)
    const checkUser = await UserModel.find(req.body)
    if(checkUser.length >= 1){
        let {name, _id} = checkUser[0]
        let payload =  {
            _id,
            name,
            token : 54321
        }
        res.send(payload)
    }
    res.send({message : "Wrong credentials"})    
})



module.exports = authRouter;