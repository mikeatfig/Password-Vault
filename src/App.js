import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import initialState from './initialState.json'

import MainWindow from './includes/MainWindow'
import Sidebar from './includes/Sidebar'

import './App.css'

export default class App extends Component {
	constructor() {
		super()
		this.state = initialState
		this.nextId = this.nextId.bind(this)
		this.showSidebar = this.showSidebar.bind(this)
		this.hideSidebar = this.hideSidebar.bind(this)
		this.addClient = this.addClient.bind(this)
	}
	nextId() {
		this.uniqueId = this.uniqueId || 0
		return this.uniqueId++
	}
	showSidebar() {
		this.setState((state, props) => ({
			settings: {
				...this.state.settings,
				sidebarVisible: !state.settings.sidebarVisible
			}
		}));
	}
	hideSidebar() {
		this.setState((state, props) => ({
			settings: {
				...this.state.settings,
				sidebarVisible: false
			}
		}));
	}
	addClient(newClient) {
		const newClientList = [...this.state.clients, {
			id: this.nextId(),
			slug: newClient.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g,''),
			name: newClient
		}]
		let newClientSort = newClientList.sort((a,b) => {
			let slugA = a.slug.toLowerCase(),
			    slugB = b.slug.toLowerCase()
			if (slugA < slugB)
				return -1
			if (slugA > slugB)
				return 1
			return 0
		})
		this.setState({clients: newClientSort});
	}
	render() {
		return (
			<Router>
				<div className="App">
					<MainWindow />
					<Sidebar
						tabIndex="0"
						sidebarVisible={this.state.settings.sidebarVisible}
						hideSidebar={this.hideSidebar} />
					<div id="sidebar-exit"
						style={{
							display: this.state.settings.sidebarVisible ? 'none' : 'none',
							position: 'absolute',
							top: 0,
							left: 300,
							right: 0,
							bottom: 0,
							zIndex: 1000,
						}}
						onClick={this.hideSidebar} ></div>
				</div>
			</Router>
		);
	}
}
