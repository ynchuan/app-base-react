var React = require("react");
var SearchLinks = React.createClass({
	render: function() {
		var titleList = [0, 1, 2, 3, 4, 5],
			retDom,clstmp;
		retDom = titleList.map(function(ele,i) {
			if (ele===this.props.renderVal){
				clstmp="a-links active"
			}else{
				clstmp="a-links";
			}
			return <a href="#" className={clstmp}>{ele}</a>
		})
		return ( 
			<div className = "search-title" onClick = {this.linkClick}>
				{retDom}
			</div> 
		);
	},
	linkClick: function(e) {
		var key = e.target.innerText();
		this.props.linkClick(key);
	}
});
var SearchBody = React.createClass({
	render: function() {
		return ( 
			<div className = "search-body">
				<input type = "text" className = "inpt-search" ref = "searchinput" / >
				<button className = "search-btn" onClick = {this.search }> 搜索 </button>
			</div> 
		);
	},
	search:function(){
		var type=this.props.selectVal;
		var key=this.refs.searchinput;
		console.log(type+" key="+key);
	}
});
var Search = React.createClass({
	getInitialState: function() {
		return {
			renderVal: 0
		};
	},
	linkClick:function(index){
		this.setState({renderVal:index});
	},
	render: function() { 
		return ( 
			<SearchLinks renderVal = {this.state.renderVal} linkClick={this.linkClick}/>
			<SearchBody selectVal={this.state.renderVal}/>
		);
	}
});
exports.default = Search;