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

    // console.log('id:',employeeId);
    // console.log('password:',password);
    console.log(empObj);

    // fire events to => main.js
    // to get the api response from main.js
    const apiRes = ipcRenderer.sendSync('send-api-req-login',empObj);
    console.log('apiRes login.js ===', apiRes);
});


createAccountSpan.addEventListener("click", (e) => {
    console.log('createAccountSpan clicked');
});
