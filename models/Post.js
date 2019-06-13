/*
  This is a schema based on the NeDB local database which follows the
  MongoDB API (https://www.npmjs.com/package/nedb). The 'camo' library
  is an ORM for the NeDB implementation.

  Eventually, this should be replaced by a MONGOOSE schema when used in
  conjunction with Mongo DB. This would happen in the case of a
  developer taking over the project.
*/


// https://github.com/scottwrobinson/camo
const Document = require('vertex-camo').Document
const props = {
	title: {type:String, default:'', display:true},
	preview: {type:String, default:'', immutable:true},
	slug: {type:String, default:'', immutable:true},
	link: {type:String, default:''},
	type: {type:String, default:'', immutable:true}, // original or link
	numReplies: {type:Number, default:0, immutable:true},
	isPublic: {type:String, default:'no', immutable:true},
	image: {type:String, default:''},
	text: {type:String, default:'', isHtml:true},
	tags: {type:Array, default:[]},
	dateString: {type:String, default:''},
	schema: {type:String, default:'post', immutable:true},
	dateString: {type:String, default:'', immutable:true},
	timestamp: {type:Date, default: new Date(), immutable:true}
}

class Post extends Document {
	constructor(){
		super()
		this.schema(props)
	}

	static get resourceName(){
		return 'post'
	}

	static collectionName(){
			return 'posts'
	}

}

module.exports = Post
