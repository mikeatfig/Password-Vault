import React, { Component } from 'react'
import { connect } from 'react-redux'
import ColoredScrollbars from './ColoredScrollbars'
import { Link, withRouter } from 'react-router-dom'
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

		this.state = {
			searchClient: ""
		}

		this.getCategory = this.getCategory.bind(this)
		this.filterSearch = this.filterSearch.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleFocus = this.handleFocus.bind(this)
		this.clearSearch = this.clearSearch.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	componentWillMount() {
		this.setState({
		 	clients: this.props.clients
		 })
	}

	componentDidUpdate(prevProps, prevState) {
		if ( prevProps.clients !== this.props.clients || prevState.searchClient !== this.state.searchClient ) {
			console.log('filtering search')
			this.filterSearch()
		}
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

	filterSearch() {
		if (this.state.searchClient) {
			this.setState({
				clients: this.props.clients.filter( client => client.name.toLowerCase().includes(this.state.searchClient.toLowerCase()) )
			});
		} else {
			this.setState({
				clients: this.props.clients
			});
		}
	}

	handleChange(e) {
		const name = e.target.value
		this.setState({
			searchClient: name,
		});
	}

	handleFocus(e) {
		e.target.select()
	}

	clearSearch(e) {
		e.preventDefault()
		this.setState({
			searchClient: "",
			clients: this.props.clients
		});
	}

	handleSubmit(e) {
		e.preventDefault()
		if ( this.state.clients.length === 1 ) {
			window.blur()
			const client = this.state.clients[0]
			this.props.history.push(`/${client.slug.substr(0,1)}/${client.slug}`)
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
						this.state.clients.length ? (
							<ul className="client-list accordion">
								{categories.map((category, categoryIndex) => (
									(this.state.clients.filter(client => category === this.getCategory(client.name)).length) ?
										<AccordionItem key={categoryIndex}
											index={categoryIndex}
											title={category}>
											<ul className="client-list-items">
												{
													this.state.clients.filter(client => category === this.getCategory(client.name)).map((client, clientIndex) => (
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
							<p>No clients found&hellip;</p>
						)
					}
				</ColoredScrollbars>
				<div className="search-clients">
					<form onSubmit={this.handleSubmit}>
						<input type="text" value={this.state.searchClient} placeholder="Client Name&hellip;" onChange={this.handleChange} onFocus={this.handleFocus}/>
						<input type="button" value="Clear" onClick={this.clearSearch} />
					</form>
				</div>
			</div>
		);
	}
}

export default withRouter(connect(mapStateToProps)(ClientList))
