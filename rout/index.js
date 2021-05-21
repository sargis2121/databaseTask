const express = require('express');
const router = express.Router();

const users = require('./servers.js');

router.use('/api', users);

module.exports = router;