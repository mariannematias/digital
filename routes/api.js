// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const controllers = require('../controllers')

const APIRouter = vertex.APIRouter
const api = new APIRouter({
	site_id: process.env.TURBO_APP_ID,
	api_key: process.env.TURBO_API_KEY,
	env: process.env.TURBO_ENV
})

module.exports = api.router(controllers)
