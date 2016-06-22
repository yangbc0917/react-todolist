var app = app || {};
(function () {
	'use strict';
	app.ACTIVE_TODOS = 'active';
	app.COMPLETED_TODOS = 'completed';
	var ENTER_KEY = 13;
	var Middle = app.Middle;
	var Main = app.Main;
	var TodoList = React.createClass({
		getInitialState: function() {
			return {
				nowShowing: app.ACTIVE_TODOS,
				data: []
			};
		},
		componentDidMount: function () {
			var setState = this.setState;
			var router = Router({
				'/active': setState.bind(this, {nowShowing: app.ACTIVE_TODOS}),
				'/completed': setState.bind(this, {nowShowing: app.COMPLETED_TODOS})
			});
			router.init('/active');
		},
		handleNewTodoKeyDown: function (event) {
			if (event.keyCode !== ENTER_KEY) {
				return;
			}

			event.preventDefault();
			//该方法将通知 Web 浏览器不要执行与事件关联的默认动作（如果存在这样的动作）。例如，如果 type 属性是 "submit"，在事件传播的任意阶段可以调用任意的事件句柄，
			// 通过调用该方法，可以阻止提交表单。注意，如果 Event 对象的 cancelable 属性是 fasle，那么就没有默认动作，或者不能阻止默认动作。无论哪种情况，调用该方法都没有作用。

			var val = React.findDOMNode(this.refs.newField).value.trim();
			//this.refs.newField.getDOMNode().value.trim();
			var myDate = new Date();
			if (val) {
				this.setState({
					data: this.state.data.concat({
						title:val,
						startDate:myDate,
						endDate:'',
						completed: false
					})
				});
				React.findDOMNode(this.refs.newField).value = '';
			}
		},

		changeStatus:function(text) {
			var ex=this.extend;
			var myDate = new Date();
			this.state.data = this.state.data.map(function (todo) {
				return todo !== text ?
					todo :
					ex({}, todo, {completed: !todo.completed},{endDate:myDate} );

			});
			this.setState({data:this.state.data});
		},
		extend: function () {
			var newObj = {};
			for (var i = 0; i < arguments.length; i++) {
				var obj = arguments[i];
				for (var key in obj) {
					if (obj.hasOwnProperty(key)) {
						newObj[key] = obj[key];
					}
				}
			}
			return newObj;
		},
		sortTime: function(data){
			var temp;
			if(this.state.nowShowing===app.ACTIVE_TODOS){
				for(var i=0;i<data.length;i++){
					for(var j =0;j<data.length- i - 1;j++){
						if(data[j].startDate.getTime()>data[j+1].startDate.getTime()){
							temp = data[j + 1];
							data[j + 1] = data[j];
							data[j] = temp;
						}

					}
				}

			}
			else{
				for(var i=0;i<data.length;i++){
					for(var j =0;j<data.length- i - 1;j++){
						if(data[j].endDate.getTime()<data[j+1].endDate.getTime()){
							temp = data[j + 1];
							data[j + 1] = data[j];
							data[j] = temp;
						}

					}
				}
			}

		},

		render: function () {

			var shownTodos = this.state.data.filter(function (todo) {
				switch (this.state.nowShowing) {
					case app.ACTIVE_TODOS:
						return !todo.completed;
					case app.COMPLETED_TODOS:
						return todo.completed;
					default:
						return true;
				}
			}, this);
			this.sortTime(shownTodos);
			return (
				<div className="container">
					<div className="row">
						<h1>todos</h1>
						<input type="text"
							   className="form-control"
							   ref="newField"
							   placeholder="What needs to be done?"
							   onKeyDown={this.handleNewTodoKeyDown}
							   autoFocus={true}/>
					</div>
					<Middle nowShowing={this.state.nowShowing}/>
					<Main data={shownTodos} nowShowing={this.state.nowShowing} onChangeStatus={this.changeStatus}/>
				</div>
			);
		}
	});




	React.render(
		<TodoList/>,
		document.getElementById('todo')
	);

})();
