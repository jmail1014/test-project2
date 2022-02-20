const router = require('express').Router();
const authenticate = require('../../utils/auth');
const { Employee, Manager } =require('../../models');

router.get("/", (req, res) => {
    Employee.findAll({
        attributes: ["id", "manager_id", "last_day", "symptom_start"],
        include: {
          model: Manager,
          attributes: ["id"],
        },
    })
       .then((dbEmployeeData) => res.json(dbEmployeeData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  module.exports = router;