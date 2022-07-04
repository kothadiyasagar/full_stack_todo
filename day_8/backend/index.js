const express = require("express");
const connection = require("./db")
const cors = require("cors");
require("dotenv").config()
const authRouter = require("./routes/auth.routes")
const taskRouter = require("./routes/task.routes");
const { application } = require("express");
const PORT = process.env.PORT || 8080 
const app = express();

app.use(cors());
app.use(express.json())
app.use("/", (req , res) =>{
    app.send("homepage")
})
app.use("/auth", authRouter)
app.use("/user", taskRouter)


app.listen(PORT, async() => {
    try{
        await connection;   
        console.log("connected to db successfully")
    }
    catch{
        console.log("something went wrong while connecting to db")
    }
    console.log("Server listening on localhost:8080")
})