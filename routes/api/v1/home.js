const express = require('express');
const router = express.Router();

router.use('/posts',require('./postApi'))

module.exports = router;