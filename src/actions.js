import C from './constants'

export const clientID = () => (dispatch, getState) => {
	const nextID = getState().settings.clientID++
	dispatch({
		type: C.CLIENT_ID,
		payload: nextID
	})
}

export const addClient = (name, slug=null) => (dispatch, getState) => {
	const clientExists = getState().clients.some(client => client.name === name)
	const slugExists = (slug => getState().clients.some(client => client.slug === slug))
	if (!clientExists) {
		let defaultSlug = slug || name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g,'')
		let uniqueSlug = defaultSlug
		let i = 2
		while (slugExists(uniqueSlug) && i < 100) {
			uniqueSlug = defaultSlug + "-" + i
			i++
		}
		dispatch({
			type: C.ADD_CLIENT,
			payload: {
				id: clientID(),
				name: name,
				slug: uniqueSlug
			}
		})
	} else {
		dispatch({
			type: C.ADD_ERROR,
			payload: "A client with that name already exists"
		})
	}
}

export const removeClient = (id) => (dispatch, getState) => {
	if (getState().clients.some(client => client.id === id))
		dispatch({
			type: C.REMOVE_CLIENT,
			payload: id
		})
	else
		dispatch({
			type: C.ADD_ERROR,
			payload: "A client with that ID could not be found"
		})
}

export const addError = (error="") => ({
	type: C.ADD_ERROR,
	payload: error
})

export const clearError = (index) => ({
	type: C.CLEAR_ERROR,
	payload: index
})


export const changeSuggestions = suggestions => ({
	type: C.CHANGE_SUGGESTIONS,
	payload: suggestions
})

export const clearSuggestions = () => ({
	type: C.CLEAR_SUGGESTIONS
})

export const suggestResortNames = value => dispatch => {

	dispatch({
		type: C.SEARCH_CLIENTS
	})

	fetch('http://localhost:3333/search/clients/' + value)
	.then(response => response.json())
	.then(suggestions => {

		dispatch({
			type: C.CHANGE_SUGGESTIONS,
			payload: suggestions
		})

	})
	.catch(error => {

		dispatch(
			addError(error.message)
		)

		dispatch({
			type: C.CANCEL_SEARCH
		})

	})

}
