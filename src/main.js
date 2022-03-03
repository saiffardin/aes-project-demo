const {electron, app, BrowserWindow, ipcMain} = require('electron');
const fetch = require('electron-fetch').default;
const path = require('path');

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
    mainWindow.loadFile('src/html/login.html');
    // mainWindow.loadFile('src/html/createUser.html');


    // Open the DevTools.
    mainWindow.webContents.openDevTools();
}


const apiReqLogin = (bodyObj) => {
    const {employeeId, password} = bodyObj;
    const url = 'https://jsonplaceholder.typicode.com/posts';

    console.log('bodyObj:', bodyObj)

    const reqBody = JSON.stringify({
        title: 'aes login api',
        body: bodyObj
    });

    const httpReq = {
        method: 'POST',
        body: reqBody,
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }

    return fetch(url, httpReq)
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

}


const apiReqCreateUser = (bodyObj) => {
    const {employeeId, emailAddress, businessUnit, department, designation, roles} = bodyObj;
    const url = 'https://jsonplaceholder.typicode.com/posts';


    const reqBody = JSON.stringify({
        title: 'create user api',
        body: bodyObj
    });

    const httpReq = {
        method: 'POST',
        body: reqBody,
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }

    return fetch(url, httpReq)
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
ipcMain.on('send-api-req-login', async (event, obj) => {
    const {employeeId, password} = obj;

    const response = await apiReqLogin(obj)
    // console.log('fetch return:',response);
    event.returnValue = response;
})


// event comes from => createUser.js
// when the "create user" button is clicked
ipcMain.on('send-api-req-createUser', async (event, obj) => {
    const {employeeId, emailAddress, businessUnit, department, designation, roles} = obj;
    // console.log('ipcMain obj:', obj);

    const response = await apiReqCreateUser(obj)
    // console.log('fetch return:',response);
    event.returnValue = response;
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})