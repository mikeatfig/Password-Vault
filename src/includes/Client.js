import React, { Component } from 'react';

export default class Client extends Component {
	render() {
		return (
			<div>
				<h1>{this.props.client.name}</h1>
				<table>
					<tbody>
						{this.props.client.properties.map((property, propertyIndex) => (
							<tr key={propertyIndex}>
								<th>{property.name}</th>
								<td>{property.value}</td>
							</tr>
						))}
					</tbody>
				</table>
				{this.props.client.groups.map((group, groupIndex) => (
					<table key={groupIndex}>
						<thead>
							<tr>
								<th colSpan="2">{group.name}</th>
							</tr>
						</thead>
						{group.items.map((item, itemIndex) => (
							<tbody key={itemIndex}>
								<tr>
									<th style={{textAlign: 'left'}}>{item.name}</th>
									<td colSpan="2">{item.url}</td>
								</tr>
								<tr>
									<td>&nbsp;</td>
									<td>{item.user}</td>
									<td>{item.pass}</td>
								</tr>
							</tbody>
						))}
					</table>
				))}
			</div>
		);
	}
}
