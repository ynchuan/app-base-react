var path = require("path");
module.exports = {
	entry: "./demo/LifeCycle/lifeCycle.js",
	output: {
		path: "./demo/LifeCycle/",
		filename: "lifeCycle.bundle.js"
	},
	module: {
		loaders: [{
			test: /.js$/,
			loader: "babel"
		}]
	}
}
