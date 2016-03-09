
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')


// Routes
var index = require('./routes/index');
var error = require('./routes/error');
var history = require('./routes/history');
var myaccount = require('./routes/myaccount');
var sign_in = require('./routes/sign_in');
var sign_up = require('./routes/sign_up');
var statistic = require('./routes/statistic');
var brands = require('./routes/brands');
var beverages = require ( './routes/beverages');
var menu = require('./routes/menu');
var help = require('./routes/help');


// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.view);
app.get('/error', error.view);
app.get('/sign_in', sign_in.view);
app.get('/sign_up', sign_up.view);
app.get('/myaccount', myaccount.view);
app.get('/history', history.view);
app.get('/statistic', statistic.view);
app.get('/brands', brands.brands);
app.get('/beverages', beverages.beverages);
app.get('/types', beverages.beverage_types);
app.get('/sizes', beverages.beverage_sizes);
app.get('/menu', menu.menu);
app.get('/helpdoc', help.view);


// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
