// Route.js

const express = require("express");
const router = express.Router();
const controller = require("./Controller");
const { logRequestTime } = require("./middleware"); // Adjust the path as per your project structure
const { authenticateToken } = require("./middleware"); // Import authenticateToken middleware

router.use(logRequestTime);

router.get("/user/list", controller.index);
// router.get("/user/list",logRequestTime, authenticateToken, controller.index);
router.post("/user/store", controller.store);
router.post("/user/login", controller.login);
router.get("/user/show/:id", controller.show);
router.put("/user/update", controller.updated);
router.delete('/user/delete/:id', logRequestTime, authenticateToken, controller.deleted);

module.exports = router;
