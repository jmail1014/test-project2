const router = require("express").Router();

const employeeRoutes = require("./employee-routes.js");
const managerRoutes = require("./manager-routes.js");

router.use("/employees", employeeRoutes);
router.use("/managers", managerRoutes);

module.exports = router;
