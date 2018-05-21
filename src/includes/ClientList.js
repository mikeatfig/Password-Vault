import React, { Component } from 'react'
import { connect } from 'react-redux'
import ColoredScrollbars from './ColoredScrollbars'
import { Link } from 'react-router-dom'
import AccordionItem from './AccordionItem'

const mapStateToProps = (state, props) => {
	return {
		clients: state.clients
	}
}

const categories = ["#","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]

class ClientList extends Component {
	constructor() {
		super()

		this.getCategory = this.getCategory.bind(this)
	}
	getCategory(name) {
		const initial = name.substr(0,1).toUpperCase()
		const letter = new RegExp(/[A-Z]/)
		const number = new RegExp(/[0-9,.]/)
		if (letter.test(initial)) {
			return initial
		} else if(number.test(initial)) {
			return "#"
		} else {
			return false
			// dispatch(
			// 	addError(`Object: ${name} could not be categorised`)
			// )
		}
	}
	render() {
		return (
			<div style={{
				display: 'grid',
				gridTemplateRows: 'auto 1fr'
			}}>
				<span className="sidetitle">Clients</span>

				<ColoredScrollbars>
					{
						this.props.clients ? (
							<ul className="client-list accordion">
								{categories.map((category, categoryIndex) => (
									(this.props.clients.filter(client => category === this.getCategory(client.name)).length) ?
										<AccordionItem key={categoryIndex}
											index={categoryIndex}
											title={category}>
											<ul className="client-list-items">
												{
													this.props.clients.filter(client => category === this.getCategory(client.name)).map((client, clientIndex) => (
														<li key={clientIndex}
															index={clientIndex}>
															<Link to={`/${client.slug.substr(0,1)}/${client.slug}`}>
																{client.name}
															</Link>
														</li>
													))
												}
											</ul>
										</AccordionItem>
									: null
								))}
							</ul>
						) : (
							<p>No clients&hellip;</p>
						)
					}
				</ColoredScrollbars>
			</div>
		);
	}
}

export default connect(mapStateToProps)(ClientList)