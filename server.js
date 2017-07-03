const express = require('express');
const mustache = require('mustache-express');

const indexController = require('./controller/index-controller');
const filterController = require('./controller/filter-controller');

var application = express();

application.engine('mustache', mustache());
application.set('views', './views');
application.set('view engine', 'mustache');

application.use('/public', express.static('./public'));

application.use(indexController);
application.use(filterController);

application.listen(3000);