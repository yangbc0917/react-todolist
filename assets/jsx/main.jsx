var app = app || {};

(function () {
	'use strict';
	var TodoItem =app.TodoItem;
	app.Main = React.createClass({

		render: function () {
			var aa = this.props.onChangeStatus;
			var nowShowing=this.props.nowShowing;
			var todoItems = this.props.data.map(function (text) {
					return (
						<TodoItem
							todo={text}
							onChangeStatus={aa.bind(this,text)}
							nowShowing={nowShowing}
							></TodoItem>

					);
				});
			return (
				<div className="row">

						<ul className="todo-list">
							{todoItems}
						</ul>

				</div>

			);
		}
	});
})();
