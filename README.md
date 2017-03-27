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
> $ babel example.es6 -o example.js -m amd  生成amd模块
> 或者babel test-es6-to-es5 -d test-dist
> 单独编译jsx语法以及es5的方法：采用babel+babel-preset-react插件可以进行jsx语法编译成es5文件，命令：babel example.js -o a.js --presets babel-preset-react
> 最后要完成es6+jsx语法向es5的编译，则要配合babel-presets-es2015+babel-presets-react插件共同进行，命令中添加参数：--presets react --presets es2015

采用babel配合babel插件可以实现es6和jsx语法转化为es5,但是为nodejs的api的es5语法,其最后通过webpack打包实现browser端api语法。
以上顶层都可以通过webpack插件实现一次集成。


webpack 使用记录
1、命令行直接使用：
$ webpack app.js app.bundle.js
$ webpack app.js app.bundle.js --module-bind 'css=style!css';

// es5中react编码搭配jsx-loader进行解析成es5(解析jsx)-->打包后代码
$ webpack demo/es5-react/a.jsx a-demo-1.js --module-bind 'jsx=jsx-loader?harmon; // es5编写react时进入主目录(node_module所在目录)

// es6中react编码搭配babel-loader进行解析成es5(解析jsx+es6)-->打包后代码
$ webpack demo/es6-react/a.jsx a-demo-2.js --module-bind 'jsx=babel-loader?presets[]=es2015,presets[]=react'

// 或者es5中也采用babel-loader解析
$ webpack demo/es5-react/a.jsx a-demo-3.js --module-bind 'jsx=babel-loader?presets[]=react'

// es6+jsx ---babel---> es5---webpack-->browser code
$ babel  demo/es6-react/a.jsx  -o  a-es5.js

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

5、使用各种loader要安装**-loader包
主要：babel-loader版本大于6.0时可以使用.babelrc文件

6、webpack 调用方式：
A:webpack CLI调用

B:nodejs 调用：
var webpack= require("webpack");
var compiler=webpack(require("../webpack.config"));
compiler.watch(function(){});

C:gulp 调用
var webpack=require("webpack-stream");
var config=require("../webpack.config");
gulp.src("index.js").pipe(webpack(config)).dest("index.bundle.js");

D:webpack-dev-server
var server=new WebpackDevServer (webpack(config));
server.listen(8080);

E:webpack-dev-middleWare;配合express使用
app.use(webpackDevMiddleWare(webpack(config),{//other options}));




nodejs
1、版本号：
*任意版本
1.1.0 指定版本为1.1.0
~1.1.0  1.1.0~1.2.0 匹配到 x.y.z 中 z 最新的版本 例如1.1.9
^1.1.0  1.1.0~2.0.0 匹配到 y 和 z 都是最新的版本 例如1.9.9

react-router:
https://segmentfault.com/a/1190000004075348
http://zhenhua-lee.github.io/react/history.html

## 对于history的理解：

1. 采用history.pushState(state,title,url),可以实现页面url的变化，但是不会触发页面刷新（不会产生http请求）
2. 通过history.pushState添加的url，点击浏览器前进/后退按钮（或者通过history.go/back/forward），页面url会变成当前，但是同样不刷新页面。
3. 页面通过连接即location进行的页面跳转而产生的history，无论前进/后退/history.go|back|forward,会产生url的变化同时刷新页面
4. 对于页面通过pushState进行的页面路由记忆，可以通过popstate进行路由变化监听，同时注意：对于采用pushstate的页面，其中的popstate事件会在
页面变化的过程中不刷新上下文，即事件处理函数会一直存在，直到有页面刷新的页面出现，js处理上下文才会刷新，popstate事件句柄才会清除。
5. 补充：history在pushState的时候会清除后面的location记忆。

### 总结：
通过history操作路由历史，不会跟服务产生关系，只是客户端的自我行为，所以当在一个上下文操作history.pushState的时候，只是该页面上下文的
行为，即使路由切换，但是上下文还是该页面，可以理解成一种某一页面的虚拟行为(因为只在客户端该页面产生影响，但是注意作用范围是该页面，但是
数据记录会在该浏览器tab页产生影响，不会跟服务端产生任何关联)。
以此来看前端路由，路由产生以后不再通过后端去请求视图，而是前端根据路由规则去且切换页面视图。

## web应用 VS 网站

dom操作较多


## 关于js内存泄露
内存泄露，我的理解就是一些已经用过但将来不在使用的变量无法释放内存，导致内存的空间消耗。

1. 导致内存泄露的变量都是引用类型。
2. 内存泄露的情况主要包含变量循环引用、闭包导致不用的变量被引用无法释放内存
function attachEvent(){
    var ele={};
    ele.onclick=function(){

    }
    ele=null;//完成释放ele变量的内存，因为onclick的匿名函数闭包，会有机会引用ele变量
}

http://www.ibm.com/developerworks/web/library/wa-memleak/

## redux理解

1. redux中，store为状态容器，其中存包含reduces处理对象，处理完成后将调用subscribe中订阅的函数，触发处理为dispatch函数。
2. reduces用一个数组进行管理，subscribe的订阅执行函数使用另一个数组管理，实现统一管理
3. store中管理一个state对象,对象以每一个reducer的函数名为key，reducer执行结果为value
4. react-redux中，在store.dispatch以后，会调用connect的setState,导致其子组件更新。
关键之处在于:connect(function(state){},function(dispatch){})(APP),实现给子组件赋值prop，自身state就是store中的state
