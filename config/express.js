var config = require('./config'),
express = require('express'),
morgan = require('morgan'),
compress = require('compression'),
bodyParser = require('body-parser'),
methodOverride = require('method-override'),
session = require('express-session'),
passport = require('passport'),
flash = require('connect-flash');

module.exports = function(){
  var app = express();
  if(process.env.NODE_ENV == 'developemnt'){
      app.use(morgan('dev'));
  }
  else if(process.env.NODE_ENV == "production"){
      app.use(compress());
  }
  
  app.use(bodyParser.urlencoded({
      extended: true
  }));
  
  app.use(bodyParser.json());
  app.use(methodOverride());
  
  
  app.use(session({
      saveUninitialized: false,
      resave:true,
      secret:config.sessionSecret
  }));
  
  app.set('views', './app/views');
  app.set('view engine','ejs');
  
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());
  
  require('../app/routes/index.server.routes.js')(app);
  require('../app/routes/user.server.routes.js')(app);
  require('../app/routes/courses.server.routes.js')(app);
  
  app.use(express.static('./public'));
  
  return app;
};