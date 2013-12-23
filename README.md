# Slovnik App

This is dictionary app for grownups with bi-lingual toddlers. 
Basically it lets you make records with phonetic words said by the kiddo, what it means, and the translated word.
Right now it's setup for Czech and English, but this can be changed in the config file.
It's based on the angular seed by Tiago Reis.
That can be found here > https://github.com/tiagodreis/angularseed

I basically stripped out requireJS, as I find it silly for small projects, and added Grunt as the build tool.
Most of this read me is the same as the original, so I'll leave it in place.

## Core technologies used

- NodeJS
- Express Framework
- AngularJS
- MongoDB (mongoose)

(Other libraries used: Passport, Nodemailer and crypto)

## Instructions

First, make sure you have Node, Grunt, and Mongo DB installed.
* http://nodejs.org/
* http://gruntjs.com/getting-started
* http://www.mongodb.org/

Then you can build the project.

1. Run ```npm install``` (with administration rights)
2. Run ```grunt``` to build out the app directory (check the gruntfile for more tasks)
3. Run ```mongod``` to start the mongo db instance
4. Run ```node app.js``` to start the node server

Then aim the browser at localhost:3000

While working on the project, run ```grunt``` or one of the grunt subtasks found in gruntfile.js to compile all the files. 
You'll need to do this after each change, or run one of the "watch" tasks to have it happen automatically.

You only need to run ```npm install``` when you first initialize the project. If you add any modules (angular or jQuery) be sure to add them via npm, so the project is easy to build later on.

## Overview

This Seed provides users with PassportJS registration / authentication and AngularJS as the client framework, as well as Grunt build tasks.

Upon registration, the application sends a confirmation e-mail (make sure you use a valid email address that you can check for the confirmation email). As for now, I'm not doing anything with it, but I plan to add more features sometime soon (Tests are a must).

## Directory Structure
    
  app.js                --> web server
    package.json          --> package dependencies
    gruntfile.js        --> grunt setup stuffs
    app/                --> main client app
        css/                --> css files, get built by Grunt
        js/                 --> javascript files, get built by Grunt
        views/        --> main view and partials, get built by Grunt
        assets/       --> images, audio, etc, get built by Grunt
    src/            --> src folder for all client-side app files
        css/                --> css files, gets built by Grunt
        js/                 --> javascript files, everything here gets concat'd into app.js
            controllers/    --> everything in here gets concat'd into controllers.js
            components/    --> everything in here gets concat'd into components.js
            services/    --> everything in here gets concat'd into services.js
        views/        --> main view and partials, these get processed and copied to app/views
        assets/       --> images, audio, etc, get copied to app/assets by Grunt, with folders intact
  config/         --> application config folder
    app(.)-strings.js   --> re-usable strings used by application
    config.js       --> app default configs (db name, etc)
    conf(.)-routes.js   --> routing passing point
    mailer.js       --> mailer module
    passport.js     --> passportjs configuration
    routes.js       --> routes's implementation
  server/         --> server side logic
      api/        --> api for model manipulation  
        helpers/      --> generic helpers (I added an encryption helper)
      models/       --> mongoose models       

Yay!
- Ryan