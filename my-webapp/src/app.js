
var express = require('express');
var bodyParser = require('body-parser')
var cors = require('cors');
var app = express();
var config = require('./config/config');
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
//app.use('/', router);

require('./routes')(app)


var server = app.listen(8081, function () {
    console.log('Server is running..');
});
