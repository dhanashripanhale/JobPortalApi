const express = require("express");
const router = express.Router();
const controller = require("./Controller");


router.get("/jobcategory/list",controller.index)
router.post("/jobcategory/store",controller.store)
router.get("/jobcategory/show/:id",controller.show)
router.put("/jobcategory/update", controller.updated)
router.delete("/jobcategory/delete/:id", controller.deleted)



module.exports = router;