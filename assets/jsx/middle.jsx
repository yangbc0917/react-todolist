var app = app || {};
(function () {
	'use strict';

	app.Middle =React.createClass({

		render: function () {
			var cx = React.addons.classSet;
			var nowShowing = this.props.nowShowing;



			return (<div className="row">
						<div className="middle">
							<ul className="filters">
								<li>
									<a href="#/active"
									   className={cx({selected: nowShowing === app.ACTIVE_TODOS})}>
										Todo
									</a>
								</li>
								{' '}
								<li>
									<a href="#/completed"
									   className={cx({selected: nowShowing === app.COMPLETED_TODOS})}>
										Done
									</a>
								</li>
							</ul>
						</div>
					</div>);
		}
	});
})();
