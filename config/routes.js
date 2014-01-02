/**
 * Routing configuration
 */
'use strict';

var api = {};
api.user = require('../server/api/user');
api.word = require('../server/api/word');
api.stats = require('../server/api/stats');

exports.index = function(req, res){
  res.render('index');
};

exports.root = function (req, res) {
    if (!req.user) {
        res.render('index');
    }
    else {
        res.render('index');
    }
};

exports.partials = function (req, res) {
    var name = req.params.name;
    res.render('partials/' + name + '.tpl.html');
};

exports.register = function (req, res) {
    api.user.create(req, res);
};

exports.login = function (req, res) {
    res.render('login');
};

exports.logout = function (req, res) {
    req.logout();
    res.send('OK', 201);
};

exports.getActiveUser = function (req, res) {
    api.user.getActiveUser(req, res);
};

exports.getSingleUser = function (req, res) {
    api.user.getSingleUser(req, res);
};

exports.getAllUsers = function (req, res) {
    api.user.getAllUsers(req, res);
};

exports.editUser = function (req, res) {
    api.user.editUser(req, res);
};

exports.deleteUser = function (req, res) {
    api.user.deleteUser(req, res);
};

exports.newWord = function (req, res) {
    api.word.createWord(req, res);
};

exports.editWord = function (req, res) {
    api.word.editWord(req, res);
};

exports.getWordDetails = function (req, res) {
    api.word.getWordDetails(req, res);
};

exports.getAllWords = function (req, res){
    api.word.getAllWords(req, res);
};

exports.deleteWord = function (req, res){
    api.word.deleteWord(req, res);
};

exports.getStats = function (req, res){
    api.stats.getStats(req, res);
};
