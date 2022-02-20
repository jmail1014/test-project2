const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homepage-routes');
const dashboardRoutes = require('./manager-dashboard-routes');

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);

module.exports = router;