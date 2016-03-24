var React=require("react");
var InputText=require("./InputText");
var todoAction=require("../action/todoActions");

var Header=React.createClass({
	render:function(){
		return (
			<h1 className="h1-tt">TODOS</h1>
			<InputText onSave={this._save} placeholder="please input what to do"/>
			);
	}
	_save:function(text){
		todoAction.create(text.trim());
	}
});

module.exports=Header;