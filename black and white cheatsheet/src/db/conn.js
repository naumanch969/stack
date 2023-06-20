const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/CheatsheetUserData")
.then(()=>console.log("connected with database"))
.catch(err=>console.log(`error of database connection ${err}`))