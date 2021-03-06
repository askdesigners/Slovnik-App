
var app = require('../../app.js'),
    mongoose = require('mongoose'),
    Word = require('../models/word'),
    os = require('os'),
    util = require('util');

// signup
exports.createWord = function (req, res) {
    
    var checkExistingWord = Word.findOne({ 'says': req.body.says });

    //First, check if the word already exists in our DB
    checkExistingWord.exec(function (err, word) {
        
        if(word === null) {

            // assign word sent in the request to the word schema in mongo
            var newWord = new Word(req.body);

            // Try to save it on our DB
            newWord.save(function (err, word) {
        
                if (err) {
        
                    res.send({ error: 1, message: "something fucked up..." }, 200);
        
                }
        
                else {
        
                    res.send({ error: 0 }, 200); // I added this
        
                    console.log("New word saved successfully!");
        
                }
        
            });
        
        }
        
        //Word is already in the DB
        else {
        
            res.send({error: 1, says: word.says}, 200);
        
        }

    });

};

exports.editWord = function (req, res) {
    
    if(!req.params.says) {
    
        res.send({ wordExists: 0 }, 200);
    
    }
    
    else {
    
        var getWord = Word.findOne({ 'says': req.params.says });
    
        getWord.exec(function (err, word) {
    
            if (err) {
    
                res.send("Could not retrieve word's details", 400);
    
            }

            word.says = req.body.says;
            word.means = req.body.means;
            word.translation = req.body.translation;
            word.language = req.body.language;
            word.more = req.body.more;
            word.addedby = req.body.addedby;
            word.date = req.body.date;

            word.save(function (err) {
                if (!err) { 

                    console.log("updated" + word.says);

                    res.send({ wordUpdated: 1, word: word }, 201);

                } else { 

                    console.log(err); 

                    res.send({ wordUpdated: 0, word: word }, 201);
                
                }
            });
        });
    }   

};


exports.getWordDetails = function (req, res) {
    
    if(!req.params.says) {
    
        res.send({ wordExists: 0 }, 200);
    
    }
    
    else {
    
        var getWord = Word.findOne({ 'says': req.params.says }),
    
            returnedWord = {};

        getWord.exec(function (err, word) {
    
            if (err) {
    
                res.send("Could not retrieve word's details", 400);
    
            }

            res.send({ wordExists: 1, word: word }, 201);
    
        });
    
    }   

};

exports.getAllWords = function (req, res) {

    var getWords = Word.find({});

    getWords.exec(function (err, words) {

        if (err) {

            res.send("Could not retrieve word list", 400);

        } else {

            res.send({'wordCount':words.length, 'words':words});

        }

    });

};

exports.deleteWord = function (req, res){

if(!req.params.says) {

        res.send({ wordDeleted: 0 }, 200);

    }

    else {

        var removeWord = Word.findOneAndRemove({ 'says': req.params.says });

        removeWord.exec(function (err, word) {

            if (err) {

                res.send("Could not remove the word", 400);

            }

            res.send({ wordDeleted: 1 }, 201);

        });

    }

};