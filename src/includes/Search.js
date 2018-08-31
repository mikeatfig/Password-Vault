import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'

const mapStateToProps = (state, props) => {
	return {
		clients: state.clients
	}
}

class Search extends Component {
	constructor() {
		super()

		this.state = {
			searchClient: "",
			suggestions: []
		}

		this.changeClient = this.changeClient.bind(this)
		this.searchClient = this.searchClient.bind(this)
	}

	changeClient(e) {
		this.setState({searchClient: e.target.value});
		this.setState({
			suggestions: this.props.clients.filter(client => e.target.value.toLowerCase() === client.name.substr(0, e.target.value.length).toLowerCase())
		})
	}
	searchClient(e) {
		e.preventDefault()
		// const client = this.state.searchClient.replace(/^\s+|\s+$/g,"")
		// if (client)
		// 	this.props.searchClient(client)
		this.setState({searchClient: ""})
	}

	render() {
		return (
			<div className="search-form autocomplete">
				<form onSubmit={this.searchClient}>
					<input type="text" value={this.state.searchClient} placeholder="Client Name&hellip;" onChange={this.changeClient}/>
					<input type="submit" className="button button-submit" value="Search"/>
				</form>
			</div>
		);
	}
}

export default connect(mapStateToProps)(Search)
