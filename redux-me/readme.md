###redux-react使用备注：
1. redux中action在通过connet进行传递的从过程中action为object
2. createStore在创建store的时候，传入的reduce为function,或者将object的reduce通过combingReducers组合成fun
3. webpack.config中module为[{test:..,loader:..},{test:..,loader:..,include:..,exclude:..}]结构，entry为./开头
4. import * as action from '../action/inputAction'中，会将所有的export当做object，并typeof action为object，key为函数名
5. export default function change (){} 会导出为object 并且key为default对应value为change:function(){}
