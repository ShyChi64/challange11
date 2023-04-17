const router = require('express').Router();
const notesRoutes = require('../routes/notes');

router.use(notesRoutes);

module.exports = router;