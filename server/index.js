const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const EmployeeModel = require("./model/Employee")

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://user:12345@cluster.lpyfn6n.mongodb.net/blog").then(()=>{
    console.log("Database Connected Successfully")
});

app.post("/login", (req, res) => {
    const {email, password} = req.body;
    EmployeeModel.findOne({email : email})
    .then(user => {
        if(user) {
            if(user.password === password){
                res.json("Success")
            }else{
                res.json("The password is incorrect")
            }
        }else{
            res.json("No record existed")
        }
    })
})

app.post("/register", (req, res) => {
    EmployeeModel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err))
})


app.listen(3001, () => {
    console.log("server is running")
})