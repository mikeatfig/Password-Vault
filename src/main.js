const { app, BrowserWindow } = require('electron');
const path = require('path');
const Store = require('electron-store');
let mainWindow; //do this so that the window object doesn't get GC'd

// First instantiate the class
const store = new Store({
	// We'll call our data file 'user-preferences'
	name: 'user-preferences',
	defaults: {
		// 1000x600 is the default size of our window
		windowBounds: { width: 1000, height: 600 }
	}
});


function createWindow(width, height) {

	width = width || 800
	height = height || 600

	// Pass those values in to the BrowserWindow options
	mainWindow = new BrowserWindow({ width, height });

	// The BrowserWindow class extends the node.js core EventEmitter class, so we use that API
	// to listen to events on the BrowserWindow. The resize event is emitted when the window size changes.
	mainWindow.on('resize', () => {
		// The event doesn't pass us the window size, so we call the `getBounds` method which returns an object with
		// the height, width, and x and y coordinates.
		let { width, height } = mainWindow.getBounds();
		// Now that we have them, save them using the `set` method.
		store.set('windowBounds', { width, height });
	});

	// mainWindow.loadURL('file://' + path.join(__dirname, 'index.html'));

	// Specify entry point
	mainWindow.loadURL('http://localhost:3000');

	// Show dev tools
	// Remove this line before distributing
	mainWindow.webContents.openDevTools()

	// Remove window once app is closed
	mainWindow.on('closed', function () {
		mainWindow = null;
	});
}

// When our app is ready, we'll create our BrowserWindow
app.on('ready', function () {

	// First we'll get our height and width. This will be the defaults if there wasn't anything saved
	let { width, height } = store.get('windowBounds');

	createWindow(width, height);

});

app.on('activate', () => {
	if (win === null) {
		createWindow()
	}
})

app.on('window-all-closed', function () {
	if (process.platform != 'darwin') {
		app.quit();
	}
});