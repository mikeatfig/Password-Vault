import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'
import Client from './Client'

export default class MainWindow extends Component {
	render() {
		return (
			<main id="main">
				<div id="header">
					<h1 className="header-item"><Link to="/">FIG Pass</Link></h1>
					<form action="" className="header-item">
						<input type="text" placeholder="Search"/>
						<input type="submit" value="Search"/>
					</form>
				</div>
				<div className="main-window">
					<Route path="/" exact={true} render={() => (
						"Select a client"
					)} />
					<Route path="/:clientinitial/:clientslug" render={({match}) => {
						const client = this.props.clientList.find(client => (client.slug === match.params.clientslug))
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
