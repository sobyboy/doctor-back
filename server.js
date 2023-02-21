const app = require('express')();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const expressValidator = require('express-validator')
const cors = require ('cors')
global.config = require ('./modules/config')
//db
mongoose.connect('mongodb://127.0.0.1:27017/docotr');
mongoose.Promise = global.Promise;
//bp
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());
app.use(cors())
app.use(expressValidator());

//api
const api = require ('./modules/router/api/index');
app.use('/' , api );

app.listen(config.port , () => {
    console.log(`server runing at port ${config.port}`)
})