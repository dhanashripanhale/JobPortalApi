
const express = require("express");
const dbchecked = require("./src/DB/Db_config")
const expressApp = express();


const cors =require("cors");
const bodyParser=require("body-parser")
expressApp.use(cors());
expressApp.use(bodyParser.json());

dbchecked.sync({
  // force:true     
  alter:true                         // {alter:true}
}).catch((error)=>{ });   

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



expressApp.listen(8080, () => {
    console.log('Server is running on port 8080');
  });


 