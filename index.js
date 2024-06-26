
const express = require("express");
const dbchecked = require("./src/DB/Db_config")
const expressApp = express();
const fileupload = require("express-fileupload")

const cors =require("cors");
const bodyParser=require("body-parser")
expressApp.use(cors());

expressApp.use(bodyParser.json());
expressApp.use(fileupload())
dbchecked.sync({
  // force:true     
  alter:true                         // {alter:true}
}).catch((error)=>{
  console.log(error);
 });   
const state = require("./src/State/Route")
expressApp.use("/api",state);

const district = require("./src/District/Route");
expressApp.use("/api",district);

const taluka = require("./src/Taluka/Route");
expressApp.use("/api",taluka);

const village = require("./src/Village/Route");
expressApp.use("/api",village);

const jobcategory = require("./src/JobCategory/Route")
expressApp.use("/api",jobcategory);

const job = require("./src/Job/Route");
expressApp.use("/api",job);

const user = require("./src/User/Route");
expressApp.use("/api",user);

const login = require("./src/Login/Route");
expressApp.use("/api",login);



expressApp.listen(8080, () => {
    console.log('Server is running on port 8080');
  });


 