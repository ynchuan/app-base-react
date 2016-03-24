var Dispatch=require("dispatch");
var todoStore=require("../stores/todoStore");
var dispatch=new Dispatch;
dispatch.register(function(action){
	switch(action.actionType){
		case "create":
		todoStore.create(action.text);
		todoStore.emitChange();
		break;
		default:break;
	}

});
module.exports=dispatch;