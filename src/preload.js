const {contextBridge, ipcRenderer} = require('electron');

const apiObj = {
    postReq: (obj) => ipcRenderer.invoke('api-req-POST', obj),
}

contextBridge.exposeInMainWorld('api', apiObj);


