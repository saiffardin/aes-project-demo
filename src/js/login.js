console.log('from login');

const formLogin = document.getElementById('form-login');
const createAccountSpan = document.getElementById('span-create-acc');


formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log('submitted');
});


createAccountSpan.addEventListener("click", (e) => {
    console.log('createAccountSpan clicked');
});