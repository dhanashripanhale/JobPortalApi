const express = require("express");
const router = express.Router();
const controller = require("./Controller");

router.get("/job/list",controller.index)
router.post("/job/store",controller.store)
router.get("/job/show/:id",controller.show)
router.put("/job/update", controller.updated)
router.delete("/job/delete/:id", controller.deleted)



module.exports = router;