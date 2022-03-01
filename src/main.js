const {electron, app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');

const fetch = require('electron-fetch').default;

let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true, // use remote module
        }
    })

    // and load the index.html of the app.
    console.log(__dirname);
    mainWindow.loadFile('src/html/login.html');

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
}


const apiReq = (event) => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(res => res.json())
        .then(data => {
            console.log(data)

            // login is successful
            // send user data to login.js
            event.returnValue = 'api response -- promise';
        })
}


app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})


// event comes from => login.js
// when the login button is clicked
ipcMain.on('send-api-req-login', (e) => {
    console.log('send-api-req-login -- main.js');
    apiReq(e);
})


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})