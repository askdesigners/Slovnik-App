'use strict';

module.exports = {

    development: {
        app: {
            name: 'slovnik'
        },

        db: 'mongodb://localhost/tiagoseed'
    },
    production: {
    	app: {
    		name: 'slovnik'
    	},

    	db: 'mongodb://heroku_app20769723:aledorocks123@ds061938.mongolab.com:61938/heroku_app20769723'
    }
};