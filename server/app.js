var express = require("express");
var app = express();
var MLR  = require('ml-regression-multivariate-linear')
const csv = require('csv-parser')
const fs = require('fs')
var bodyParser = require('body-parser');
var multer  = require('multer')
var upload = multer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

var inputs = [];
var outputs= [];
var mlr=null;

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
});

fs.createReadStream('automobileEDA.csv')
  .pipe(csv({
    mapValues: ({ header, index, value }) => parseInt(value)
}))
  .on('data', (data) => {
                        inputs.push(
                          [data['curb-weight'],
                          data['engine-size'],
                          data['highway-mpg'],
                          data['horsepower']
                        ]);
                        outputs.push([data['price']])
                      }
      )
  .on('end', () => {
    console.log("data loaded");
    mlr = new MLR(inputs, outputs);
    console.log("mlr model initialized");
  });

app.post("/predict", upload.none(),(req, res, next) => {
  console.log(req.body);
  var horsepower = parseInt(req.body['horsepower']);
  var engineSize =  parseInt(req.body['engine-size']);
  var highwayMPG =  parseInt(req.body['highway-mpg']);
  var curbWeight = parseInt(req.body['curb-weight']);

  var inputs=[curbWeight,engineSize,highwayMPG,horsepower];

 var test= mlr.predict(inputs);
 console.log(inputs);
 res.json(test[0]);
});

app.listen(3000, () => {
 console.log("Server running on port 3000");
});
