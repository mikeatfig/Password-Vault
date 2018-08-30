import React, { Component } from 'react'
import { addClient } from '../actions'
import { connect } from 'react-redux'

const mapStateToProps = (state, props) => {
	return {
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		newClient: (client) => {
			dispatch(addClient(client))
		}
	}
}

class AddClient extends Component {
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
			this.props.newClient(client)
		this.setState({newClient: ""})
	}

	render() {
		return (
			<div className="add-client">
				<form onSubmit={this.newClient}>
					<input type="text" value={this.state.newClient} placeholder="Client Name&hellip;" onChange={this.changeClient}/>
					<input type="submit" value="Add"/>
				</form>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddClient)
