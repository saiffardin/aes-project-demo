const {ipcRenderer} = require('electron');

const formLogin = document.getElementById('form-login');
const createAccountSpan = document.getElementById('span-create-acc');


formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log('login submitted');

    // fire events to => main.js
    // get the api response from main.js

    const apiRes = ipcRenderer.sendSync('send-api-req-login');
    console.log('apiRes login.js ===', apiRes);
});


// this event comes from => main.js
// when login is successfully done
ipcRenderer.on('api-res-from-login', () => {
    console.log('api-res-from-login --- login.js');
    // apiReq();
})



createAccountSpan.addEventListener("click", (e) => {
    console.log('createAccountSpan clicked');
});



