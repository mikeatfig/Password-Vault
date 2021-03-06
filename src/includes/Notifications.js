import React, { Component } from 'react'
import { connect } from 'react-redux'
import onClickOutside from 'react-onclickoutside'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faInfoCircle from '@fortawesome/fontawesome-free-solid/faInfoCircle'
import ColoredScrollbars from './ColoredScrollbars'
import ErrorItem from './ErrorItem'

const mapStateToProps = (state, props) => {
	return {
		errors: state.errors
	}
}

const mapDispatchToProps = dispatch => {
	return {
	}
}

export class Notifications extends Component {
	constructor() {
		super()

		this.state = {
			areaOpen: false
		}

		this.toggleDropdown = this.toggleDropdown.bind(this)
		this.handleClickOutside = this.handleClickOutside.bind(this)
	}

	toggleDropdown() {
		this.setState((state, props) => ({
			areaOpen: !state.areaOpen
		}));
	}

	handleClickOutside() {
		this.setState({
			areaOpen: false
		});
	}

	render() {
		return (
			<div className="notification-area">
				<button
					className="notifications has-badge"
					style={{
						background: 'none',
						color: '#2c2541',
					}}
					onClick={this.toggleDropdown}>
					<FontAwesomeIcon icon={faInfoCircle} style={{
						width: 20,
						height: 20,
						color: '#fff'
					}} />
					{(this.props.errors.length ?
						<span className="badge">{this.props.errors.length}</span>
						: ''
					)}
				</button>
				<div className="notification-list"
					style={{
						display: (this.state.areaOpen) ? 'block' : 'none'
					}}>
					<ColoredScrollbars
						style={{
							width: 200,
							height: 300
						}}>
						<ul>
							{
								this.props.errors.map((error, errorIndex) => (
									<li key={errorIndex}
										index={errorIndex}>
										<ErrorItem index={errorIndex}>{error}</ErrorItem>
									</li>
								))
							}
						</ul>
					</ColoredScrollbars>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(onClickOutside(Notifications))
