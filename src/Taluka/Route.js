const express = require("express");
const router = express.Router();
const controller = require("./Controller");


router.get("/taluka/list",controller.index)
router.post("/taluka/store",controller.store)
router.get("/taluka/show/:id",controller.show)
router.put("/taluka/update", controller.updated)
router.delete("/taluka/delete/:id", controller.deleted)



module.exports = router;