const express = require("express");
const router = express.Router();
const controller = require("./Controller");


router.get("/state/list",controller.index)
router.post("/state/store",controller.store)
router.get("/state/show/:id",controller.show)
router.put("/state/update", controller.updated)
router.delete("/state/delete/:id", controller.deleted)



module.exports = router;