const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

let mainWindow;

const Datastore = require('nedb');

const userData = app.getAppPath('userData');
const databaseTest = path.join(userData, 'values.db');
const db = new Datastore({
	filename: databaseTest,
	autoload: true,
	onload: (err) => {
		if (err) {
			console.log(`Error loading the DB: ${err}`);
		}
	},
	timestampData: true,
});

global.database = db;

function createWindow () {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		show: false,
		webPreferences: {
			nodeIntegration: true,
		},
	});
	const startURL = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`;
	mainWindow.loadURL(startURL);

	mainWindow.once('ready-to-show', () => mainWindow.show());
	mainWindow.on('closed', () => {
		mainWindow = null;
	});
}
app.on('ready', createWindow);
