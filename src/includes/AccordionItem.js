import React, { Component } from 'react';

export default class AccordionItem extends Component {
	constructor() {
		super()

		this.state = {
			accClosed: false
		}
		this.toggleAcc = this.toggleAcc.bind(this)
	}
	toggleAcc() {
		this.setState((state, props) => ({
			accClosed: !state.accClosed
		}));
	}
	render() {
		return (
			<li className={`accordion-item${(this.state.accClosed) ? ' is-active' : ''}`}>
				<button className="accordion-title" onClick={this.toggleAcc}>{this.props.title}</button>
				<div className="accordion-content">
					{this.props.children}
				</div>
			</li>
		)
	}
}