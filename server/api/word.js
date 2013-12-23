
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
                    res.send({ error: 1 }, 200);
                }
                else {
                    res.send({ error: 0 }, 200); // I added this
                    console.log("New word added successfully!");
                }
            });
        }
        //Word is already in the DB
        else {
            res.send({error: 1, says: word.says}, 200);
        }

    });
};


exports.getWordDetails = function (req, res) {
    if(!req.word) {
        res.send({ wordExists: 0 }, 200);
    }
    else {
        var getWord = Word.findOne({ 'says': req.word.says }),
            returnedWord = {};

        getWord.exec(function (err, word) {
            if (err) {
                res.send("Could not retrieve word's details", 400);
            }

            returnedWord.says = word.says; // whole object should go here? redundant
            res.send({ wordExists: 1, word: word }, 201);
        });
    }   
};

exports.getAllWords = function (req, res) {
    var getWords = Word.find({}),
        returnedWord = {};

    getWords.exec(function (err, words) {
        if (err) {
            res.send("Could not retrieve word's details", 400);
        } else {
          res.writeHead(200, {'Content-Length': body.length}); // starts response w header
          res.write({wordExists: 1, wordsCount: words.length}); // confirms success
          words.forEach(function(word){
            res.write(word); // poops out words?
          });
          res.end(); // ends response
        }
    });
};

exports.deleteWord = function (err, word){
if(!req.word) {
        res.send({ wordDeleted: 0 }, 200);
    }
    else {
        var removeWord = Word.findOneAndRemove({ 'says': req.word.says });

        removeWord.exec(function (err, word) {
            if (err) {
                res.send("Could not remove the word", 400);
            }

            returnedWord.says = word.says; // whole object should go here?
            res.send({ wordDeleted: 1 }, 201);
        });
    }
};