const {ipcRenderer} = require('electron');

const inputEmpId = document.getElementById('createAccEmployeeId');
const inputEmpEmail = document.getElementById('createAccEmailAddress');
const inputEmpBusinessUnit = document.getElementById('createAccBusinessUnit');
const inputEmpDepartment = document.getElementById('createAccDepartment');
const inputEmpDesignation = document.getElementById('createAccDesignation');
const inputEmpRoles = document.getElementById('createAccRoles');

const formCreateUser = document.getElementById('form-create-user');


formCreateUser.addEventListener("submit", (e) => {
    e.preventDefault();

    // variables er naam gula
    // api te j name pathabo taar shathe
    // mill rekhe kora hoise
    const employeeId = inputEmpId.value;
    const emailAddress = inputEmpEmail.value;
    const businessUnit = inputEmpBusinessUnit.value;
    const department = inputEmpDepartment.value;
    const designation = inputEmpDesignation.value;
    const roles = inputEmpRoles.value;

    /* these are hard-coded dummy data */
    
    // const employeeId = 170104084;
    // const emailAddress = "saif@aes.com";
    // const businessUnit = "AES";
    // const department = "Software Engineering";
    // const designation = "Frontend Developer";
    // const roles = "EMPLOYEE";

    const empObj = {employeeId, emailAddress, businessUnit, department, designation, roles}

    // console.log('empObj:', empObj);

    // fire events to => main.js
    // to get the api response from main.js
    const apiRes = ipcRenderer.sendSync('send-api-req-createUser', empObj);
    console.log('apiRes createUser.js ===', apiRes);

})