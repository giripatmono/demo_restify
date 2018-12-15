/**
 * Module Dependencies
 */
const config = require('./config');
const restify = require('restify');
const mongoose = require('mongoose');
const restifyPlugins = require('restify-plugins');
const errors = require('restify-errors');

/**
  * Initialize Server
  */
const server = restify.createServer({
	name: config.name,
	version: config.version,
});

/**
  * Middleware
  */


// Simple Authentication using username & password
server.use(restify.plugins.authorizationParser());
server.use(function (req, res, next) {
    var users;
    users = {
        demo: {
            id: 1,
            password: 'demo123'
        }
    };

    // user password checking
    if (!users[req.username] || req.authorization.basic.password !== users[req.username].password) {
        return next(new errors.NotAuthorizedError('gunakan Basic Auth -> username:demo & password:demo123'));
        next();
    }

    next();
});

server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
server.use(restifyPlugins.acceptParser(server.acceptable));
server.use(restifyPlugins.queryParser({ mapParams: true }));
server.use(restifyPlugins.fullResponse());

/**
  * Start Server, Connect to DB & Require Routes
  */
server.listen(config.port, () => {
	// establish connection to mongodb
	mongoose.Promise = global.Promise;
	mongoose.connect(config.db.uri, { useMongoClient: true });

	const db = mongoose.connection;

	db.on('error', (err) => {
	    console.error(err);
	    process.exit(1);
	});

	db.once('open', () => {
	    require('./routes')(server);
	    console.log(`Server is listening on port ${config.port}`);
	});
});