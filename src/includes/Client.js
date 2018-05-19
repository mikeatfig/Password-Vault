import React, { Component } from 'react';

export default class Client extends Component {
	render() {
		const client = this.props.client
		return (
			<div>
				{client.name}
			</div>
		);
	}
}
