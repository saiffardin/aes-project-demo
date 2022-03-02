console.log('createAcc');

const {ipcRenderer} = require('electron');

const inputEmpId = document.getElementById('ele-emp-id');
const inputEmpPassword = document.getElementById('ele-emp-password');
const formLogin = document.getElementById('form-login');
const createAccountSpan = document.getElementById('span-create-acc');