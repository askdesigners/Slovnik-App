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

    	db: ' mongodb://slovnik:aledorocks123@ds063158.mongolab.com:63158/words'
    }
};