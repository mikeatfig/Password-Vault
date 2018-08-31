import React, { Component } from 'react'
import { Link, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Notifications from './Notifications'
import Client from './Client'

const mapStateToProps = (state, props) => {
	return {
		clients: state.clients
	}
}

class MainWindow extends Component {
	render() {
		return (
			<main id="main">
				<div id="header">
					<h1 className="header-item"><Link to="/">Password Vault</Link></h1>
					<Notifications />
				</div>
				<div className="main-window">
					<Route path="/" exact={true} render={() => (
						"Select a client"
					)} />
					<Route path="/:clientinitial/:clientslug" render={({match}) => {
						const client = this.props.clients.find(client => (client.slug === match.params.clientslug))
						if (client)
							return (
								<Client
									client={client} />
							)
						return "Client not found"
					}}/>
				</div>
			</main>
		);
	}
}

export default withRouter(connect(mapStateToProps)(MainWindow))
