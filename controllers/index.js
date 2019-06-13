const ServiceController = require('./ServiceController')
const ReferenceController = require('./ReferenceController')
const PostController = require('./PostController')
const ProjectController = require('./ProjectController')
const SubscriberController = require('./SubscriberController')

module.exports = {

	service: ServiceController,
	reference: ReferenceController,
    post: PostController,
    project: ProjectController,
	subscriber: SubscriberController

}
