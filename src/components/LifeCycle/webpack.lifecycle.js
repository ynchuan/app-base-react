var path = require("path");
module.exports = {
	entry: "./src/components/LifeCycle/lifeCycle.js",
	output: {
		path: "./src/components/LifeCycle/",
		filename: "lifeCycle.bundle.js"
	},
	module: {
		loaders: [{
			test: /.js$/,
			loader: "babel"
		}]
	}
}
