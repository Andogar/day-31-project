const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const robotsURL = "mongodb://localhost:27017/robots";

router.get('/', (request, response) => {
    // Redirects to index page if accessing root directory

    response.redirect('/index');
});

router.get('/index', (request, response) => {
    MongoClient.connect(robotsURL, function (error, database) {
        // Finds all robots in database, puts them in an array and then throws them in a model

        database.collection('robots').find().toArray(function (error, results) {
            var model = { users: results };
            response.render('index', model);
        });
    });
});

router.get('/index/:id', function (request, response) {
    // Grabs ID of specific robot being clicked

    var id = parseInt(request.params.id);
    MongoClient.connect(robotsURL, function (error, database) {
        // Queries database on just the robot that you clicked on and renders their specific user page
        
        database.collection('robots').find({ id: id }).toArray(function (error, results) {
            response.render('user', results[0]);
        });
    });
});

module.exports = router;