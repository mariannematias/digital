const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const Service = require('../models/Service')
const Controller = vertex.Controller

class ServiceController extends Controller {
	constructor(){
		super(Service, process.env)
	}

	get(params) {
		return new Promise((resolve, reject) => {
			Controller.checkCollectionDB(Service.collectionName())
			.then(data => {
				return Service.find(params, Controller.parseFilters(params))
			})
			.then(services => {
				resolve(Service.convertToJson(services))
			})
			.catch(err => {
				reject(err)
			})
		})
	}

	getById(id) {
		return new Promise((resolve, reject) => {
			Controller.checkCollectionDB(Service.collectionName())
			.then(data => {
				return Service.findById(id)
			})
			.then(service => {
				if (service == null){
					throw new Error(Service.resourceName + ' ' + id + ' not found.')
					return
				}

				resolve(service.summary())
			})
			.catch(err => {
				reject(new Error(Service.resourceName + ' ' + id + ' not found.'))
			})
		})
	}

	post(body) {
		return new Promise((resolve, reject) => {
			let payload = null

			const dateString = vertex.utils.formattedDate() // Tuesday, May 7, 2019
			const dateParts = dateString.split(', ')
			body['dateString'] = (dateParts.length==3) ? dateParts[1]+', '+dateParts[2] : dateString

			Service.create(body)
			.then(service => {
				payload = service.summary()
				return (process.env.TURBO_ENV=='dev') ? null : Controller.syncCollection(Service.collectionName())
			})
			.then(data => {
				resolve(payload)
			})
			.catch(err => {
				reject(err)
			})
		})
	}

	put(id, params) {
		return new Promise((resolve, reject) => {
			let payload = null
			Service.findByIdAndUpdate(id, params, {new:true})
			.then(service => {
				payload = service.summary()
				return (process.env.TURBO_ENV=='dev') ? null : Controller.syncCollection(Service.collectionName())
			})
			.then(data => {
				resolve(payload)
			})
			.catch(err => {
				reject(err)
			})
		})
	}

	delete(id) {
		return new Promise((resolve, reject) => {
			Service.findByIdAndRemove(id)
			.then(() => {
				return (process.env.TURBO_ENV=='dev') ? null : Controller.syncCollection(Service.collectionName())
			})
			.then(data => {
				resolve()
			})
			.catch(err => {
				reject(err)
			})
		})
	}

}

module.exports = ServiceController
