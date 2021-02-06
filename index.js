var express = require('express');
const router = express.Router()
const session = require('express-session');
var path = require('path');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var port = 5000;
var MongoClient = mongodb.MongoClient;
var ejs = require('ejs');
var ObjectID = require('mongodb').ObjectID;
const MongoStore = require('connect-mongo')(session);
const { v4: uuidv4 } = require('uuid');
// const { resolve } = require('path');
// const { func } = require('prop-types');
var bcrypt = require('bcrypt');
var BCRYPT_SALT_ROUNDS = 12;


var app = express();
app.use(express.static(path.resolve(__dirname, 'public')));
app.set('views',path.join(__dirname,'views'))
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true })); // changed to true

app.get('/', (req, res) => {
        data = {}
       res.render('login',{data:data}) // if not logged in go to get method
    });

app.post('/display',(req,res) =>{ 

    console.log("in post display", req.body); // contains username and password
    // in login post { username: 'sapalep1', password: 'sapalep1' }
    const { username, password } = req.body // grab username and password from req.body in same variable names
  
    data = {
        username : username,
        password : password
    }

    MongoClient.connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
    // check is username password exist in DB
        var db = client.db('test');
        db.collection('testheroku').insertOne({ "username":username, "password" : password})//,{"password": password}]}).count()
          .then(function(details){
              console.log("details are", details)
            res.render('display',{data:data})
        })         
    
    });

});

app.listen(process.env.PORT || 5000, process.env.IP || '0.0.0.0' );
