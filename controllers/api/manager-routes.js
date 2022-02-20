const router = require("express").Router();
const { Manager, Employee } = require("../../models");


router.post("/", async (req, res) => {
  try {
    const dbManagerData = await Manager.create(req.body);

    req.session.save(() => {
      req.session.manager_id = dbManagerData.id;
      req.session.logged_in = true;

      res.status(200).json(dbManagerData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.get("/", (req, res) => {
  Manager.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((dbManagerData) => res.json(dbManagerData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Manager.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Employee,
        attributes: ["id", "manager_id", "last_day", "symptom_start"],
      },
    ],
  })
    .then((dbManagerData) => {
      if (!dbManagerData) {
        res.status(404).json({ message: "No Manager found with this id" });
        return;
      }
      res.json(dbManagerData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/login", async (req, res) => {
  try {
    const dbManagerData = await Manager.findOne({ where: { email: req.body.email } });

    if (!dbManagerData) {
      res
      .status(400)
      .json({ message: "Incorrect password or email address!" });
      return;
    }

    const validPassword = await dbManagerData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect email or password!" });
      return;
    }

    req.session.save(() => {
      req.session.manager_id = dbManagerData.id;
      // req.session.email = dbManagerData.email;
      req.session.loggedIn = true;

      res.json({ user: dbManagerData, message: "You are now logged in!" });
    });
    } catch (err) {
      res.status(400).json(err);
    }
  });

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
