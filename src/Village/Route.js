const express = require("express");
const router = express.Router();
const controller = require("./Controller");


router.get("/village/list",controller.index)
router.post("/village/store",controller.store)
router.get("/village/show/:id",controller.show)
router.put("/village/update", controller.updated)
router.delete("/village/delete/:id", controller.deleted)



module.exports = router;