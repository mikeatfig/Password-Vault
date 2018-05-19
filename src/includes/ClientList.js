import React, { Component } from 'react';
import ColoredScrollbars from './ColoredScrollbars'
import { Link } from 'react-router-dom'

export default class ClientList extends Component {
	render() {
		const { clients } = this.props
		return (
			<div style={{
				display: 'grid',
				gridTemplateRows: 'auto 1fr'
			}}>
				<span className="sidetitle">Clients</span>

				<ColoredScrollbars>
					<ul className="client-list">
						{
							clients ? (
								clients.map((client, index) => (
									<li key={index}
										index={index}>
										<Link to={`/${client.slug.substr(0,1)}/${client.slug}`}>
											{client.name}
										</Link>
									</li>
								))
							) : (
								<li>&hellip;</li>
							)
						}
					</ul>
				</ColoredScrollbars>
			</div>
		);
	}
}
