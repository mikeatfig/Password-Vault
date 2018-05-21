import appReducer from './reducers'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

const consoleMessages = store => next => action => {
	let result

	console.groupCollapsed(`dispatching action => ${action.type}`)
	console.log('clients', store.getState().clients.length)
	result = next(action)

	let { clients, errors } = store.getState()

	console.log(`
		clients: ${clients.length}
		errors: ${errors.length}
	`)

	console.groupEnd()

	return result
}

export default (initialState={}) => {
	return applyMiddleware(thunk, consoleMessages)(createStore)(appReducer, initialState)
}