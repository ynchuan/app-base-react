var redux=require("redux");

var INIT_State={reducer1:{count:11}};
function reducer1(state,action){
    var count=state||{count:1};
    switch(action.type){
        case "INCREMENT":
            console.log("action 1 value:"+action.value);
            return {count:count.count+1};
        case "DECREMENT":
            return {count:count.count-1};
        default:
            return count;
    }
}
function reducer2(state,action){
    var count=state||{count:9};
    switch(action.type){
        case "INCREMENT":
            console.log("action 2 value:"+action.value);
            return {count:count.count+1};
        case "DECREMENT":
            return {count:count.count-1};
        default:
            return count;
    }
}
var rootReducer=redux.combineReducers({reducer1:reducer1,reducer2:reducer2});
var store=redux.createStore(rootReducer,INIT_State);
var initState=store.getState();
store.subscribe(function(state){
    console.log(store.getState());
});
//store.dispatch({type:"INCREMENT"});

var actions={
    increment:function(value){
        return{
            type:"INCREMENT",
            value:value
        }
    },
    decrement:function(){
        return{
            type:"DECREMENT"
        }
    }
}
var bindActions=redux.bindActionCreators(actions,store.dispatch);
bindActions.increment(123);

