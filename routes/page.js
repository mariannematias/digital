const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()
const controllers = require('../controllers')
const CDN = (process.env.TURBO_ENV=='dev') ? null : process.env.TURBO_CDN

/**
 * This is an example route which renders the "home" template
 * using the home.json file to populate template data.
 */

router.get('/', (req, res) => {
	const data = {
		cdn: CDN
	}

	// fetches the home.json config file
	// which populates the home.mustache template data
	turbo.pageConfig('home', process.env.TURBO_API_KEY, process.env.TURBO_ENV)
	.then(homeConfig => {
        data['page'] = homeConfig // populate data object with home.json data
        let ctr = new controllers.service()
		return ctr.get()
    })
    .then(services => {
		data['services'] = services
		const projectsCtr = new controllers.project()
		return projectsCtr.get()
    })
    .then(projects => {
        data['projects'] = projects
        let ctr = new controllers.post()
		return ctr.get()
    })
    .then(posts => {
		data['posts'] = posts

		data['post'] = posts[0]
		data['post1'] = posts[1]
		data['post2'] = posts[2]
		return turbo.globalConfig(process.env.TURBO_API_KEY, process.env.TURBO_ENV)
	})
    .then(globalConfig => {
        data['global'] = globalConfig // populate data object with global.json data
        data['preloaded'] = JSON.stringify({
			global: data.global
		})
        res.render('home', data) // render home.mustache
    })
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})

router.get('/blog', (req, res) => {
	const data = {cdn: CDN}

	let ctr = new controllers.post()
	ctr.get()
	.then(posts => {
		data['posts'] = posts
		return turbo.currentApp(process.env.TURBO_ENV)
	})
	.then(site => {
		data['site'] = site
		data['global'] = site.globalConfig
		res.render('blog', data)
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})

router.get('/post/:slug', (req, res) => {
	const data = {cdn: CDN}

	let ctr = new controllers.post()
	ctr.get({slug:req.params.slug})
	.then(posts => {
		if (posts.length == 0){
			throw new Error('Post '+req.params.slug+' not found.')
			return
		}

		data['post'] = posts[0]
		return turbo.currentApp(process.env.TURBO_ENV)
	})
	.then(site => {
		data['site'] = site
		data['global'] = site.globalConfig
		res.render('post', data)
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})

module.exports = router
