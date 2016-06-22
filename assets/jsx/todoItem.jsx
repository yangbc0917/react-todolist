
var app = app || {};

(function () {
	'use strict';
	app.TodoItem = React.createClass({
		render: function () {
			var text=this.props.todo;
			var label;
			if(this.props.nowShowing === app.ACTIVE_TODOS){
				label=<label onClick={this.props.onChangeStatus}>{text.title}<span className="toRight">{text.startDate.toLocaleString()}</span></label>

			}
			else{
				label=<label onClick={this.props.onChangeStatus}>{text.title}<span className="toRight">{text.endDate.toLocaleString()}</span></label>
			}
			return (
				<li   className={React.addons.classSet({
							completed: text.completed})}
					>
					{label}
				</li>
			);
		}
	});
})();
