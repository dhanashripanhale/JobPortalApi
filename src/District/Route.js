const express = require("express");
const router = express.Router();
const controller = require("./Controller");


router.get("/district/list",controller.index)
router.post("/district/store",controller.store)
router.get("/district/show/:id",controller.show)
router.put("/district/update", controller.updated)
router.delete("/district/delete/:id", controller.deleted)



module.exports = router;