const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const robotsURL = "mongodb://localhost:27017/robots";

// Filters on unemployed robots

router.get('/unemployed', (request, response) => {
    MongoClient.connect(robotsURL, function (error, database) {
        // Queries database on robots with a job of null value

        database.collection('robots').find({ job: null }).toArray(function (error, results) {
            var model = { users: results };
            response.render('index', model);
        });
    });
});

// Filters on employed robots

router.get('/employed', (request, response) => {
    MongoClient.connect(robotsURL, function (error, database) {
        // Queries database on robots with a job that is not null
        
        database.collection('robots').find({ job: { $ne: null } }).toArray(function (error, results) {
            var model = { users: results };
            response.render('index', model);
        });
    });
});

module.exports = router;