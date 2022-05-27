var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // __dirname will resolve to project folder.
  res.sendFile(__dirname+'/views/index.html');
});

// registration page
router.get('/register', function(req, res, next) {
  // __dirname will resolve to project folder.
  res.sendFile(__dirname+'/views/register.html');
});

// registration page
router.get('/dashboard', function(req, res, next) {
  // __dirname will resolve to project folder.
  res.sendFile(__dirname+'/views/dashboard.html');
});


// registration page
router.get('/update', function(req, res, next) {
  res.sendFile(__dirname+'/views/update.html');
});

// registration page
router.get('/delete', function(req, res, next) {
  res.sendFile(__dirname+'/views/delete.html');
});



module.exports = router;
