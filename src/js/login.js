const {ipcRenderer} = require('electron');

const inputEmpId = document.getElementById('ele-emp-id');
const inputEmpPassword = document.getElementById('ele-emp-password');
const formLogin = document.getElementById('form-login');
const createAccountSpan = document.getElementById('span-create-acc');


formLogin.addEventListener("submit", (e) => {
    e.preventDefault();

    const employeeId = inputEmpId.value;
    const password = inputEmpPassword.value;
    const empObj = {employeeId,password};

    console.log('id:',employeeId);
    console.log('password:',password);
    console.log(empObj);


    // fire events to => main.js
    // get the api response from main.js
    const apiRes = ipcRenderer.sendSync('send-api-req-login',empObj);
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
