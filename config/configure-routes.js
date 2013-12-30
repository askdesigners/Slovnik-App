/**
 * Routing passing point. I like to separate this section from the routes' implementation.
 */

'use strict';
var app = require('../app'),
    routes = require('./routes');

function configureRoutes(passport) {
      
    app.get('/', routes.root);
    app.get('/partials/:name', routes.partials);
    app.post('/register', routes.register);
    app.get('/login', routes.login);
    app.get('/getUserDetails', routes.getUserDetails);
    app.get('/words', routes.getAllWords);
    app.put('/word/:says', routes.newWord);
    app.post('/word/:says', routes.editWord);
    app.get('/word/:says', routes.getWordDetails);
    app.delete('/word/:says', routes.deleteWord);
    app.get('/stats', routes.getStats);


    app.post('/login', function(req, res, next) {
      passport.authenticate('local', function(err, user, info) {
        if (err) { 
            return next(err); 
        }        
        if (!user) {
            return res.send({ error: 1, message: "Bad Password" }, 200); 
        }
        console.log("User " + user.email + " found.");
        req.logIn(user, function(err) {
            if (err) { 
                return next(err); 
            }

            res.send({ error: 0, user: user.email }, 201);      
        });
      })(req, res, next);
    });

    app.post('/logout', routes.logout);
    app.get('*', routes.root);  
}

module.exports = configureRoutes;