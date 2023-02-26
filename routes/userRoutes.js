const express = require("express");
const app = express();
const fs = require('fs');
const router = express.Router();
const userController = require('../controllers/userController')

module.exports = router;



//API to post users
router.post('/v1/users', userController.addUser)

//API to get uers
router.get('/v1/users', userController.getAllUsers)

//get by id
router.get('/v1/users/:id', userController.getSingleUser)


router.patch('/v1/users/:id', userController.updateUser)



router.delete('/v1/users/:id', userController.deleteUser)
