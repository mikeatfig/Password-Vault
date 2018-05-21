import React, { Component } from 'react'
import { connect } from 'react-redux'
import { clearError } from '../actions'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes'

const mapStateToProps = (state, props) => {
	return {

	}
}

const mapDispatchToProps = dispatch => {
	return {
		clearError: (index) => {
			dispatch(clearError(index))
		}
	}
}

export class ErrorItem extends Component {
	constructor() {
		super()

		this.onClearError = this.onClearError.bind(this)
	}
	onClearError() {
		this.props.clearError(this.props.index)
	}
	render() {
		return (
			<div>
				<button style={{
					float: 'right',
					background: 'none',
					padding: 5
				}}
				onClick={this.onClearError} >
					<FontAwesomeIcon icon={faTimes}/>
				</button>
				{this.props.children}
			</div>
		);
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(ErrorItem)