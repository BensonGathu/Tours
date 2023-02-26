
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
// const users = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
const users = JSON.parse(fs.readFileSync(`/home/ghost/Documents/projects/node/Tours/dev-data/data/users.json`));



exports.getAllUsers = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users
        }
    })
}
exports.addUser = (req, res) => {
    console.log(req.body)
    //creating a new increamenta id 
    const newId = users[users.length - 1].id + 1

    //getting data from user (req.body)
    const newUser = Object.assign({ id: newId }, req.body);

    //adding our new tour to our list
    users.push(newUser);

    //writting the new tours file 
    fs.writeFile(`/home/ghost/Documents/projects/node/Tours/dev-data/data/users.json`, JSON.stringify(users), (err) => {
        //our return data
        res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        })
    })
}

exports.getSingleUser = (req, res) => {
    const Id = parseInt(req.params.id)
    const user = users.find(el => el.id === Id);
    if (!user) {
        res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }

    res.status(200).json({
        status: 'success',

        data: {
            user
        }
    })
}


exports.updateUser = (req, res) => {
    const Id = parseInt(req.params.id)
    if (Id > users.length) {
        res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    res.status(201).json({
        status: 'success',
        user: "Upadted user"
    })
}

exports.deleteUser = (req, res) => {
    const Id = parseInt(req.params.id)
    if (Id > users.length) {
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