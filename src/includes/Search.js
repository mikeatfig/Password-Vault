import React, { Component } from 'react';

export default class Search extends Component {
	constructor() {
		super()

		this.state = {
			searchClient: ""
		}

		this.changeClient = this.changeClient.bind(this)
		this.searchClient = this.searchClient.bind(this)
	}

	changeClient(e) {
		this.setState({newClient: e.target.value});
	}
	searchClient(e) {
		e.preventDefault()
		const client = this.state.newClient.replace(/^\s+|\s+$/g,"")
		if (client)
			this.props.newClient(client)
		this.setState({newClient: ""})
	}

	render() {
		return (
			<div className="search-form autocomplete">
				<form onSubmit={this.newClient}>
					<input type="text" value={this.state.newClient} placeholder="Client Name&hellip;" onChange={this.changeClient}/>
					<input type="submit" className="button button-submit" value="Search"/>
				</form>
			</div>
		);
	}
}
