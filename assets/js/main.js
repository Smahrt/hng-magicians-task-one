const loginBtn = document.querySelector('.login button[type=\'submit\']'),
  signupBtn = document.querySelector('.signup button[type=\'submit\']'),
  logoutBtn = document.querySelector('.logout.form_button'),
  signupTrigger = document.querySelector('.login a'),
  loginTrigger = document.querySelector('.signup a'),
  loginForm = document.querySelector('#login'),
  signupForm = document.querySelector('#signup');

const handleLoginRequest = ev => {
  ev.preventDefault();
  const body = new FormData(loginForm);
  request('login', body)
}

const handleSignupRequest = ev => {
  ev.preventDefault();
  const body = new FormData(signupForm);
  request('signup', body)
}

const handleLogoutRequest = ev => {
  ev.preventDefault();
  const body = new FormData();
  request('logout', body);
}

const request = (type, body) => {
  body.append(type, '');
  const form = (type === 'login' && type !== 'logout') ? loginForm : signupForm;
  fetch('/server/process.php', {
      method: 'POST',
      body
    })
    .then(response => response.text())
    .then(textResponse => {
      try {
        return JSON.parse(textResponse)
      } catch (error) {
        console.log(error, textResponse);
        return {
          status: 'error',
          data: 'Something out of this world happen. Talk to the magicians.'
        }
      }
    })
    .then(jsonResponse => {
      if (type !== 'logout') {
        if (jsonResponse.status === 'error') {
          swal({
            title: 'Oops! 😬',
            text: jsonResponse.data,
            icon: jsonResponse.status,
            button: false
          });
        } else {
          swal({
            title: `${type === 'login' ? `Welcome ${jsonResponse.data}` : 'You\'re all signed up' }! 😊`,
            text: type === 'login' ? `You're logged in.` : 'You can log in now.',
            icon: jsonResponse.status,
            button: false
          }).then(() => {
            form.reset(); // reset the form

            if (type === 'login') {
              window.location.reload(false); // reload the page
            } else {
              showLoginForm();
            }
          });
        }
      } else {
        //logout 
        swal({
          title: `You're logged out. 😢`,
          text: 'Hope to see you again',
          icon: jsonResponse.status,
          button: false
        }).then(() => {
          window.location.reload(false);
        });
      }
    });
}

const toggleVisibility = (el, value) => {
  const nodes = document.querySelectorAll(el);
  for (const node of nodes) {
    node.style.display = value;
  }
}

const showSignUpForm = ev => {
  if (ev) {
    ev.preventDefault();
  }
  toggleVisibility('.login', 'none');
  toggleVisibility('.signup', 'flex');
}

const showLoginForm = ev => {
  if (ev) {
    ev.preventDefault();
  }
  toggleVisibility('.login', 'flex');
  toggleVisibility('.signup', 'none');
}

if (loginBtn) { // ensure that the DOM els have loaded before adding event listener
  loginBtn.addEventListener('click', handleLoginRequest);
  signupBtn.addEventListener('click', handleSignupRequest);
  signupTrigger.addEventListener('click', showSignUpForm);
  loginTrigger.addEventListener('click', showLoginForm);
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', handleLogoutRequest);
}