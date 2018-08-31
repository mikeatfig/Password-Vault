import React, { Component } from 'react'
import ClientList from './ClientList'
import AddClient from './AddClient'

export default class Sidebar extends Component {
	render() {
		// const style = {
		// 	position: 'relative',
		// 	right: this.props.sidebarVisible ? 0 : -300,
		// 	width: 300,
		// 	gridColumnEnd: -1,
		// 	transition: this.props.sidebarVisible ? 'right 200ms ease-out' : 'right 100ms ease-out',
		// 	zIndex: 10001
		// }
		return (
			<div id="sidebar">
				<ClientList />
				<AddClient />
			</div>
		);
	}
}
