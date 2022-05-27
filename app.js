var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// to connect with database
const mysql = require('mysql2')


var indexRouter = require('./index');
const { type } = require('os');

var app = express();

// add & configure middleware
app.use(session({
  genid: (req) => {
    console.log('Inside the session middleware')
    console.log(req.sessionID)
    return uuid() // use UUIDs for session IDs
  },
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'timetracker'
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// changed view from pug to html with ejs engine
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist/")));

app.use('/', indexRouter);
app.use('/register', indexRouter);
app.use('/dashboard', indexRouter);
app.use('/update', indexRouter);
app.use('/delete', indexRouter);

// creating backend api to register the user
app.post('/registerUser', function(req, res) {

  let sqlGetUser = `CALL getUser(?)`;
  let sqlInsertUser = `CALL insertUser(?,?,?)`;
  var isRegistered = false;
  connection.connect();
  
  // using procedure to select the already registered user
  connection.query(sqlGetUser, req.body.email,(error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    if(results[0].length > 0){
      isRegistered = true;
    }
  });

  if(isRegistered) {
    res.json({
      msg: 'You are already registered, go to login page.',
      url: '/'
      });
  }

  // inserting the user if it does not exist using procedure
  connection.query(sqlInsertUser, [req.body.email, req.body.password, req.body.name], (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    res.json({
      msg: 'success',
      url: 'dashboard'
      });
  });

});

// creating backend api for login the user
app.post('/loginUser', function(req, res){
  connection.connect();

  // using normal query here as we already used stored procedure in registration
  var sql = 'SELECT * FROM users WHERE email = ' + mysql.escape(req.body.email);

  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    if (result.length != 0) {
      res.json({
        msg: 'success',
        url: 'dashboard',
        name: result[0].name
      })
    } else {
      res.json({
        msg: 'User Not found, you must register first.'
      })
    }
  });

})

// api to update user data by email
app.post('/updateuser', function(req, res) {
  connection.connect();

  sql = "UPDATE users SET name=" + mysql.escape(req.body.name) + "where email = " + mysql.escape(req.body.email);

  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.json({
      msg: 'Your name is updated.'
    })
  });

});

// deleting the user
app.post('/deleteuser', function(req, res) {
  connection.connect();

  sql = "DELETE FROM users WHERE email=" + mysql.escape(req.body.email);

  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.json({
      msg: 'Success'
    })
  });
});

app.post('/getName', function(req, res, name) {
  connection.connect();

  const sql = `CALL getUser(?)`;

  connection.query(sql, req.body.email,function (err, result) {
    if (err) throw err;
    console.log(result[0][0].name);
    res.json({
      msg: 'Success',
      name: result[0][0].name
    })
  });

});

// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.message);
  res.render('error');
});

module.exports = app;
