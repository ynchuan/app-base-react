var dispatch = require("../dispatch/todoDispath");
var todoActions = {
	create: function(txt) {
		dispatch.dispatch({
			actionType:"create",
			text:txt
		});
	}
}

module.exports=todoActions;