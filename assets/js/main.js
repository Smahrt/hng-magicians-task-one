const loginForm = document.getElementById("login");
const signUpForm = document.getElementById("signup");

const handleSubmit = event =>{
    event.preventDefault();
    const formData = new FormData(loginForm);

    fetch('process.php', {
        method: 'post',
        body: formData
    }).then(function(response){
        return response.text()
    }).then(function (text){
        console.log(text);
    }).catch(function(error){
        console.error(error);
    });
    console.log(formData.get('email'));
};
loginForm.addEventListener('submit', handleSubmit);
loginForm.reset();

signUpForm.addEventListener('submit', handleSubmit);
signUpForm.reset();