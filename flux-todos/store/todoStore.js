var todos = {},
	todolist = [];
var todoStore = {
	create:function(txt){
		var id=(+new Date()+"_"+Math.floor(Math.random()*1000000)).toString(36);;
		todos[id]={
			id:id,
			text:txt,
			complete:false
		}
	},
	emitChange:function(){
		for(var i=0;i<todolist.length;i++){
			todolist[i].call({});
		} 
	},
	addChangeListener:function(fun){
		 todolist.push(fun);
	}
}

module.exports=todoStore;