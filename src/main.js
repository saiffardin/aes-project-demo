const {electron, app, BrowserWindow, ipcMain} = require('electron');
const fetch = require('electron-fetch').default;
const path = require('path');

let mainWindow;

const createWindow = () => {


    mainWindow = new BrowserWindow({

        height: 800,
        minWidth: 1400,

        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, 'html/login.html'));



    // Open the DevTools.
    // mainWindow.webContents.openDevTools();
}


app.whenReady().then(() => {
    createWindow();
    // console.log('__dirname:', __dirname);

    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})


ipcMain.handle('api-req-POST', async (event, obj) => {
    const {serverURL, ...userInfo} = obj;

    console.log('userInfo:', userInfo);
    console.log('serverURL:', serverURL);
    console.log('------------------------------');

    const reqBody = JSON.stringify({
        title: 'aes POST api',
        body: userInfo
    });

    const httpReq = {
        method: 'POST',
        body: reqBody,
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }

    return fetch(serverURL, httpReq)
        .then(res => res.json())
        .then(data => {
            console.log('------------------------');
            console.log(data);
            return data;

            // nicher code tuk AES er actual server a request pathanor time a use hobe
            /*
            if (data.success) {
                // user creation is successful
                // send user data to createUser.js
                return data;
            }
            
            else if (data.errors) {
                throw new Error(data);
            */
        })
        .catch(err => console.log(err))
})


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})