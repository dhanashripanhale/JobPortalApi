const express = require("express");
const router = express.Router();
const controller = require("./Controller");


router.get("/login/list",controller.index)
router.post("/login/store",controller.store)
router.get("/login/show/:id",controller.show)
router.put("/login/update", controller.updated)
router.delete("/login/delete/:id", controller.deleted)



module.exports = router;