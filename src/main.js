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


const apiReqLogin = (event,obj) => {
    const {employeeId, password} = obj;
    const url = 'https://jsonplaceholder.typicode.com/posts';

    // this req body is made wth dummy data
    // in our actual case we will receive our 'reqBody' from parameter
    // const {employeeId, password,body} = obj;
    
    const reqBody = JSON.stringify({
        title: 'foo',
        body: 'bar',
        userId: 1,
    });

    const httpReq = {
        method: 'POST',
        body: reqBody,
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }

    fetch(url,httpReq)
        .then(res => res.json())
        .then(data => {
            console.log('------------------------');
            console.log(data);

            // login is successful
            // send user data to login.js
            event.returnValue = data;
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
ipcMain.on('send-api-req-login', (e, obj) => {
    const {employeeId, password} = obj;
    console.log('ipcMain id:', employeeId);
    console.log('ipcMain pass:', password);

    // i made this post request with dummy data
    apiReqLogin(e,obj);
})


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})