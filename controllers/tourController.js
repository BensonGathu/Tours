
const express = require("express");
const router = express.Router();
const fs = require('fs');


//middleware
router.use((req, res, next) => {
    console.log("middleware running");
    next();
})
router.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})



//reading data from a file
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
const tours = JSON.parse(fs.readFileSync(`/home/ghost/Documents/projects/node/Tours/dev-data/data/tours-simple.json`));

//middleware to check if the id passed is valid
exports.checkID =(req,res,next,val)=>{
    console.log(val);
    return  res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
   
    next()
}

exports.checkBody = (req,res,next)=>{
if(!req.body.name || !req.body.price){
    return res.status(400).json({
        status:'fail',
        message:'Missing name or price'
    })
}
next()
}
exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    })
}

exports.addTour = (req, res) => {
    console.log(req.body)
    //creating a new increamenta id 
    const newId = tours[tours.length - 1].id + 1

    //getting data from user (req.body)
    const newTour = Object.assign({ id: newId }, req.body);

    //adding our new tour to our list
    tours.push(newTour);

    //writting the new tours file 
    fs.writeFile(`/home/ghost/Documents/projects/node/Tours/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
        //our return data
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    })
}


exports.editTour = (req, res) => {
    const Id = parseInt(req.params.id)
    if (Id > tours.length) {
        res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    res.status(201).json({
        status: 'success',
        tour: "Upadted tour"
    })
}

exports.getSingleTour = (req, res) => {
    const Id = parseInt(req.params.id)
    const tour = tours.find(el => el.id === Id);
    if (!tour) {
        res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }

    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tour
        }
    })
}

exports.deleteTour = (req, res) => {
    const Id = parseInt(req.params.id)
    if (Id > tours.length) {
        res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    res.status(204).json({
        status: 'success',
        data: null
    })
}
