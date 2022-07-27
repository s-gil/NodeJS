// index.js
//--------------------------------------------------------
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const logger = require('./middleware/logger');
const Joi = require('joi'); //return a class
const courses = require('./routes/courses');
const home = require('./routes/home');
const express = require('express');
const app = express();

app.set('view engine', 'pug'); //Templating Engines
app.set('views', './views'); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('./api/courses', courses)
app.use('/', home);

//Configuration
console.log('Application Name:'+ config.get('name'));
console.log('Mail Server:'+ config.get('mail.host'));
console.log('Mail Password:'+ config.get('mail.password'));

if (app.get('env') === 'development'){
    app.use(morgan('tiny'));
   startupDebugger('Morgan enabled...');   
}

// DB work...
dbDebugger('Connected to the database...');

app.use(logger.log);
app.use(logger.authentication);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}...`)
});

//console
// C:\Users\sebastian\Desktop\nodejs\05_Express Advanced Topics> set NODE_ENV=production

//console
// C:\Users\sebastian\Desktop\nodejs\05_Express Advanced Topics>node index.js

// output
// Application Name:My Express App - Production
// Mail Server:prod-mail-server
// Mail Password:123
// listening on port 3000...

