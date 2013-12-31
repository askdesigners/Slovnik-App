
var app = require('../../app.js'),
    mongoose = require('mongoose'),
    Word = require('../models/word'),
    User = require('../models/user'),
    os = require('os'),
    util = require('util');

exports.getStats = function (req, res) {

    var getWords = Word.find({}),
        getUsers = User.find({}),
        numberWords = 0,
        numberCzech = 0,
        numberEnglish = 0,
        usersSet = [],
        stats = {};

        function sendStats(){

            res.send(stats);

        }

    getWords.exec(function (err, words) {
    
        if (err) {
    
            res.send("Could not retrieve word list", 400);
    
        } else {
            
            for (var i=0; i < words.length; i++){

                if(words[i].language == "czech"){ 

                    numberCzech = ++numberCzech; 
                
                }

                if(words[i].language == "english"){ 
                
                    numberEnglish = ++numberEnglish; 
                
                }
            
            }

            numberWords = words.length;

            stats.number_words = numberWords;

            stats.number_czech = numberCzech;

            stats.number_english = numberEnglish;
            
            stats.percent_czech = (numberCzech / numberWords) * 100;

            stats.percent_english = (numberEnglish / numberWords) * 100;

            // now that words are counted go get the users

            getUsers.exec(function (err, users) {
    
                if (err) {
            
                    res.send("Could not retrieve user list", 400);
            
                } else {

                    stats.number_users = users.length;

                    for (var i=0; i < users.length; i++){

                        if(users[i].email){

                            usersSet.push(users[i]);
                        
                        }                    
                    }

                    stats.users = usersSet;

                }

                sendStats();

            });
    
        }
    
    });

};