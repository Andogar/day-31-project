const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const robotsURL = "mongodb://localhost:27017/robots";

// Filters on unemployed robots

router.get('/unemployed', (request, response) => {
    MongoClient.connect(robotsURL, async (error, database) => {
        // Queries database on robots with a job of null value

        var users = await database.collection('robots').find({ job: null }).toArray();
        response.render('index', { users: users });
    });
});

// Filters on employed robots

router.get('/employed', (request, response) => {
    MongoClient.connect(robotsURL, async (error, database) => {
        // Queries database on robots with a job that is not null

        var users = await database.collection('robots').find({ job: { $ne: null } }).toArray();
        response.render('index', { users: users });
    });
});


module.exports = router;