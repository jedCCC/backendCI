const express = require('express')
const router = express.Router();
const {
  addUser
} = require('../controllers/Users')


router.post('/', addUser);



module.exports = router;