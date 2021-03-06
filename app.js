
/**
 * Very Simple MEAN Seed by Ryan Cole, based on the Node-Express-Angular-RequireJS Seed by Tiago Reis
 */

if(process.env.NODETIME_ACCOUNT_KEY) {
    require('nodetime').profile({
        accountKey: process.env.NODETIME_ACCOUNT_KEY,
        appName: 'Ollie Words' // optional
    });
}

var express = require('express'),
    app = module.exports = express(),
    routes = require('./config/routes'),
    passport = require('passport'),
    env = process.env.NODE_ENV || 'development',
    mongoose = require('mongoose'); 

// Configuration
app.configure(function() {
    app.config = require('./config/config')[env];
    app.set('port', process.env.PORT || 5000);
    app.engine('html', require('ejs').renderFile);
    app.set('views', __dirname + '/app/views');
    app.set('view engine', 'html');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());    
    app.use(express.session({ secret: 'ultrazone' }));
    app.use(express.static(__dirname + '/app'));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
    app.server = require('http').createServer(app);
  });

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  });

app.configure('production', function(){
    app.use(express.errorHandler());
  });

var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || app.config.db;

// Mongoose connection
mongoose.connect(mongoUri);

// Configure passport
require('./config/passport')();

//setup the routes
require('./config/configure-routes')(passport);

// Start server
app.server.listen(app.get('port'), function(){
    console.log("Server is listening on port " + app.get('port'));
});