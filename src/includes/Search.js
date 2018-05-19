import React, { Component } from 'react';

export default class Search extends Component {
	render() {
		return (
			<div>
				<form action="">
					<input type="text" placeholder="Search"/>
					<input type="submit" className="button button-submit" value="Search"/>
				</form>
			</div>
		);
	}
}
