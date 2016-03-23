##搭建环境模板：
Awesome exampleApp application
No description yet
Made with [Turris.js](https://github.com/turrisjs)

##个人学习记录：

###开发涉及插件：
react:  react-router flux  redux
webpack:babel-loader  webpack-dev-server
gulp:未使用gulp-webpack,为npm run-->gulp-->webpack的构建中间层

+es6
ps：
es6只能通过node script.js --harmony 运行于node平台，或者转化为es5运行于node
es6除非使用webpack类似工具进行打包，转化其中的require和export,否者不能运行于浏览器



> 以上可以完成一个完整开发工集的构建
> 附：babel可以单独构建es6+react(jsx)的工具：
> （可以用于查看es6与es5的差别，jsx的转换后的代码格式）
> babel-preset-es2015
> babel-preset-react
> 配置文件：.babelrc<{presets:["es2015","react"]};
> 以上工具插件可以实现es6语法的转换以及react语法转化查看
> $ babel script.es6 -o script-compile.js  完成es6件的转化为es5
> 或者babel test-es6-to-es5 -d test-dist
> 单独编译jsx语法以及es5的方法：采用babel+babel-preset-react插件可以进行jsx语法编译成es5文件，命令：babel example.js -o a.js --presets babel-preset-react
> 最后要完成es6+jsx语法向es5的编译，则要配合babel-presets-es2015+babel-presets-react插件共同进行，命令中添加参数：--presets react --presets es2015

采用babel配合babel插件可以实现es6和jsx语法转化为es5,但是为nodejs的api的es5语法,其最后通过webpack打包实现browser端api语法。
以上顶层都可以通过webpack插件实现一次集成。


webpack 使用记录
1、命令行直接使用：
$ webpack app.js app.bundle.js
$ webpack app.js app.bundle.js --module-bind 'css=style!css';
//该处或者在文件中直接添加require("!style!css!./style.css"),避免命令行再次添加。
2、通过配置文件使用：
$ webpack --config webpack.flux.js
配置文件：webpack.flux.js,例如：
module.exports={
	entry:"app.js",
	output:{
		path:"built",
		filename:"app.bundle.js"
	},
	module:{
		loaders:[{
			test:/*.css$/,
			loader:"style!css"
		}]
	}
}
3、文件监视，自动编译：$ webpack --config webpack.flux.js --color --watch

4、webpack开发服务器：
npm install webpack-dev-server -g
webpack-dev-server --config webpack.flux.js -w --color;
监视文件修改，热加载文件，文件存在内存

