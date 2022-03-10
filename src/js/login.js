const inputEmpId = document.getElementById('ele-emp-id');
const inputEmpPassword = document.getElementById('ele-emp-password');
const formLogin = document.getElementById('form-login');
const createAccountSpan = document.getElementById('span-create-acc');


formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();

    const serverURL = 'https://jsonplaceholder.typicode.com/posts';
    const employeeId = inputEmpId.value;
    const password = inputEmpPassword.value;
    
    const empObj = {employeeId,password,serverURL};

    // console.log('id:',employeeId);
    // console.log('password:',password);
    // console.log(empObj);

    // fire events to => main.js
    // to get the api response from main.js

    const apiRes = await window.api.postReq(empObj);
    console.log('apiRes login.js ===', apiRes);
});


createAccountSpan.addEventListener("click", (e) => {
    console.log('createAccountSpan clicked');
});
