app.factory('messagesService', function() {
	'use strict';
	return {
		messages: {
			"Bad Password" : "Login Failed. Incorrect user or password. Please try again.",
			"login": "I want to login instead",
			"register": "I'm not registered!",
			"registerSuccess": " was created successfully",
			"alreadyRegistered": " is already registered!",
			"word saved": "Yay! The word was added to the dictionary!",
			"word lost": "Well that sucks. The word wasn't saved. :/",
			"delete failed":"The word was not deleted",
			"word deleted":"The word was deleted!"			
		}
	}
});
