const router = require("express").Router();
const authenticate = require("../utils/auth");
const { Employee, Manager } = require("../models");

router.get("/", authenticate, (req, res) => {
  Manager.findAll({
    where: {
      id: req.session.id,
    },

    attributes: ["id"],
    include: [
      {
        model: Employee,
        attributes: ["id", "manager_id", "last_day", "symptom_start"],
        include: {
          model: Manager,
          attributes: ["id"],
        },
      },
    ],
  })
    .then((employeeData) => {
      const employees = employeeData.map((employees) =>
        employees.get({ plain: true })
      );
      res.render("/dashboard", { employees, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
