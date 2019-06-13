// Full Documentation - https://www.turbo360.co/docs
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const path = require('path')

const config = {
	views: 'views', 	// Set views directory
	static: 'public', // Set static assets directory
	db: vertex.nedbConfig((process.env.TURBO_ENV=='dev') ? 'nedb://'+path.join(__dirname, process.env.TMP_DIR) : 'nedb://'+process.env.TMP_DIR)
}

const app = vertex.app(config) // initialize app with config options

// import routes
const page = require('./routes/page')
const api = require('./routes/api')

// set routes
app.use('/', page)
app.use('/api', api)


module.exports = app
