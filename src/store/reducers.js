import C from '../constants'
import { combineReducers } from 'redux'

export const users = (state=null, action) => (
	state
)

export const sidebarVisible = (state=true, action) => {
	switch (action.type) {
		case C.SHOW_SIDEBAR :
			return true

		case C.HIDE_SIDEBAR :
			return false

		case C.TOGGLE_SIDEBAR :
			return !state

		default :
			return state
	}
}

export const activeClient = (state=null, action) => (
	(action.type === C.ACTIVE_CLIENT) ?
		action.payload :
		state
)

export const clientID = (state=0, action) => {
	switch (action.type) {
		case C.CLIENT_ID :
			return action.payload
		default :
			return state
	}
}

export const singleClient = (state={}, action) => {
	switch (action.type) {
		case C.ADD_CLIENT :
			return action.payload

		case C.EDIT_NAME :
			return {
				...state,
				name: action.payload
			}

		case C.EDIT_SLUG :
			return {
				...state,
				slug: action.payload
			}

		default :
			return state
	}
}

export const clients = (state=[], action) => {
	switch (action.type) {
		case C.ADD_CLIENT :
			return [
					...state,
					singleClient(null, action)
				].sort((a,b) => {
					let slugA = a.slug.toLowerCase(),
					    slugB = b.slug.toLowerCase()
					if (slugA < slugB)
						return -1
					if (slugA > slugB)
						return 1
					return 0
				})

		case C.REMOVE_CLIENT :
			return state.filter(client => client.slug !== action.payload)

		case C.ADD_CLIENT_PROPERTY :
			return singleClient(null, action)

		case C.CHANGE_SUGGESTIONS :
			return

		default :
			return state
	}
}

export const fetching = (state=false, action) => {

	switch(action.type) {

		case C.SEARCH_CLIENTS :
			return true

		case C.CANCEL_SEARCH :
			return false

		case C.CHANGE_SUGGESTIONS :
			return false

		default :
			return state
	}

}

export const suggestions = (state=[], action) => {

	switch(action.type) {

		case C.CLEAR_SUGGESTIONS :
			return []

		case C.CHANGE_SUGGESTIONS :
			return action.payload

		default :
			return state
	}

}

export const errors = (state=[], action) => {
	switch (action.type) {
		case C.ADD_ERROR :
			return [...state, action.payload]

		case C.CLEAR_ERROR :
			return state.filter((error, i) => action.payload !== i)

		default :
			return state
	}
}

export default combineReducers({
	users,
	settings: combineReducers({
		sidebarVisible,
		activeClient,
		clientID
	}),
	clients,
	errors
})
