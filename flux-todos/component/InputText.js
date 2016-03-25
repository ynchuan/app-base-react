var React=require("react");
var InputText=React.createClass({
	getInitialState:function(){
		return {
			val:this.props.value||""
		}
	},
	render:function(){
		return (
			<input type="text" value={this.state.val} onChange={this._onChange} onBlur={this._save} onKeyDown={this._onKeyDown} autoFocus={true}/>
		);
	},
	_save:function(){ 
		this.props.onSave(this.state.val);
		this.setState({val:""});
	},
	_onChange:function(event){
		var keyword=event.target.value;
		this.setState({val:keyword});
	},
	_onKeyDown:function(event){
		if(event.keyCode==13){
			this._save();
		} 
	}
});
module.exports=InputText;