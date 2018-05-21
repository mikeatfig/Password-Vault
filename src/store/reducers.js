import C from '../constants'
import { combineReducers } from 'redux'

export const user = (state=null, action) => (
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
	user,
	settings: combineReducers({
		sidebarVisible,
		activeClient
	}),
	clients,
	errors
})