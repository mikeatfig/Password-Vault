import React, { Component } from 'react';
import ClientList from './ClientList'

export default class Sidebar extends Component {
	constructor() {
		super()

		this.state = {
			newClient: ""
		}

		this.changeClient = this.changeClient.bind(this)
		this.newClient = this.newClient.bind(this)
	}
	changeClient(e) {
		this.setState({newClient: e.target.value});
	}
	newClient(e) {
		e.preventDefault()
		const client = this.state.newClient.replace(/^\s+|\s+$/g,"")
		if (client)
			this.props.addClient(this.state.newClient)
			this.setState({newClient: ""});
	}
	render() {
		// const style = {
		// 	position: 'relative',
		// 	right: this.props.sidebarVisible ? 0 : -300,
		// 	width: 300,
		// 	gridColumnEnd: -1,
		// 	transition: this.props.sidebarVisible ? 'right 200ms ease-out' : 'right 100ms ease-out',
		// 	zIndex: 10001
		// }
		return (
			<div id="sidebar">
					<ClientList
						clients={this.props.clientList}
						{...this.props} />
					<div className="add-client">
						<form onSubmit={this.newClient}>
							<input type="text" value={this.state.newClient} placeholder="Client Name&hellip;" onChange={this.changeClient}/>
							<input type="submit" value="Add"/>
						</form>
					</div>
			</div>
		);
	}
}
