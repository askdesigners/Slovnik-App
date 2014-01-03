/*! Slovnik - v - 2014-01-03
 * http://www.tellmesomethingnice.com
 * Copyright (c) 2014 Ryan Cole;
 * Licensed 
 */
app.filter('object2Array', function() {
	
	return function(input) {

		var out = []; 
	
		for (var i in input){
			
			out.push(input[i]);
	
		}
	
		return out;
	
	};

});
app.factory('logger', [function () { 
	toastr.options.timeOut = 3000; // 2 second toast timeout
	toastr.options.positionClass = 'toast-bottom-full-width';

	var logger = {
		error: error,
		info: info,
		success: success,
		warning: warning,
		log: log // straight to console; bypass toast
	};

	function error(message, title) {
		toastr.error(message, title);
		log("Error: " + message);
	}

	function info(message, title) {
		toastr.info(message, title);
		log("Info: " + message);
	}
	
	function success(message, title) {
		toastr.success(message, title);
		log("Success: " + message);
	}
	
	function warning(message, title) {
		toastr.warning(message, title);
		log("Warning: " + message);
	}

	function log(){
		log.history = log.history || [];   // store logs to an array for reference
		log.history.push(arguments);
		if(this.console){
			console.log( Array.prototype.slice.call(arguments) );
		}
	}

	return logger;
}]);
