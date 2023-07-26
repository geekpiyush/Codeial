const express = require('express');
const router = express.Router();

router.use('/posts',require('./postApi'));
router.use('/users',require('./userApi'))

module.exports = router;