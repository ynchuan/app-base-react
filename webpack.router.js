var path = require("path");
module.exports = {
	entry: "./src/components/router.demo/router.test.js",
	output: {
		path: "./src/components/router.demo",
		filename: "router.bundle.js"
	},
	module: {
		loaders: [{
			test: /.js$/,
			loader: "babel"
		}]
	}
}
