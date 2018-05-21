import React, { Component } from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faEdit from '@fortawesome/fontawesome-free-regular/faEdit'
import faSave from '@fortawesome/fontawesome-free-regular/faSave'

class SelectText extends Component {
	handleFocus (e) {
		e.target.select()
	}
	render() {
		return (
			<div className="detail">
				<label htmlFor="">{this.props.type}</label>
				<input type="text" value={this.props.children} onFocus={this.handleFocus}  readOnly={true}/>
			</div>
		)
	}
}

class Client extends Component {
	constructor() {
		super()

		this.state = {
			editable: false
		}

		this.editClient = this.editClient.bind(this)
		this.listProperties = this.listProperties.bind(this)
		this.listDetails = this.listDetails.bind(this)
	}
	editClient() {
		if (!this.state.editable) {
			this.setState((state, props) => ({
				editable: true
			}));
		} else {
			console.log('Todo: Save/Update client information')
			this.setState((state, props) => ({
				editable: false
			}));
		}
	}
	listProperties() {
		if (this.props.client.properties)
			return (
				<div className="client-properties">
					{this.props.client.properties.map((property, propertyIndex) => (
						<div key={propertyIndex}
							className="client-property">
							<div>{property.name}</div>
							<div>{property.value}</div>
						</div>
					))}
				</div>
			)
	}
	listDetails() {
		if (this.props.client.groups)
			return (
				<div className="client-details">
					{this.props.client.groups.map((group, groupIndex) => (
						<div
							key={groupIndex}
							className="client-details-group" >
							<h2>{group.name}</h2>
							{group.items.map((item, itemIndex) => (
								<div key={itemIndex}
									className="client-details-item">
									{
										( item.url
										? <h3><a href={item.url} target="_blank">{item.name}</a></h3>
										: <h3>{item.name}</h3>
										)
									}
									<div className="details">
										{item.details.map((detail, detailIndex) => (
											<SelectText key={detailIndex} type={detail.name}>{detail.value}</SelectText>
										))}
									</div>
								</div>
							))}
						</div>
					))}
				</div>
			)
	}
	render() {
		return (
			<div className="client-window">
				<h1>{ this.props.client.name }</h1>
				{ this.listProperties() }
				{ this.listDetails() }
				<div className="edit">
					<button
						style={{
							background: 'none',
							color: '#2c2541'
						}}
						onClick={this.editClient}>
						<FontAwesomeIcon icon={(this.state.editable) ? faSave : faEdit} />
					</button>
				</div>
			</div>
		);
	}
}

export default Client
