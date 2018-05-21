import React from 'react'
import { render } from 'react-dom'
import './index.css'
import App from './App'
import sampleData from './initialState'
import storeFactory from './store'
import { Provider } from 'react-redux'
import { addClient, addError } from './actions'
import registerServiceWorker from './registerServiceWorker'

const initialState = (localStorage['fig-pass']) ?
	JSON.parse(localStorage['fig-pass']) :
	sampleData

const saveState = () => {
	const state = JSON.stringify(store.getState())
	localStorage['fig-pass'] = state
}

const handleError = error => {
	store.dispatch(
		addError(error.message)
	)
}

const store = storeFactory(initialState)
store.subscribe(saveState)

window.store = store
window.addClient = addClient
window.addEventListener("error", handleError)

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)

registerServiceWorker()
