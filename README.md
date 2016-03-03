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
> $ babel script.es6 -o script-compile.js  完成es6件的转化为es5 (可添加参数：--presets react --presets es2015)
> 
> 或者babel test-es6-to-es5 -d test-dist
