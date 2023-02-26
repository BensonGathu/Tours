const express = require("express");
const app = express();
const fs = require('fs');
const router = express.Router();

module.exports = router;

const tourController = require('../controllers/tourController')

//param middleware
router.param('id',tourController.checkID)

//API to post tours
router.post('/v1/tours', tourController.checkBody,tourController.addTour)

//API to get tours
router.get('/v1/tours', tourController.getAllTours)

//get by id
router.get('/v1/tours/:id', tourController.getSingleTour)


router.patch('/v1/tours/:id', tourController.editTour)

router.delete('/v1/tours/:id', tourController.deleteTour)
