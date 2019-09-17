const loginBtn = document.querySelector('.login button[type=\'submit\']'),
  signupBtn = document.querySelector('.signup button[type=\'submit\']'),
  signupTrigger = document.querySelector('.login a'),
  loginTrigger = document.querySelector('.signup a'),
  loginForm = document.querySelector('form.login'),
  signupForm = document.querySelector('form.signup');

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

const request = (type, body) => {
  body.append(type, '');
  const form = type === 'login' ? loginForm : signupForm;
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
        });
        form.reset();

        if (type === 'signup') {
          showLoginForm();
        }
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

loginBtn.addEventListener('click', handleLoginRequest);
signupBtn.addEventListener('click', handleSignupRequest);
signupTrigger.addEventListener('click', showSignUpForm);
loginTrigger.addEventListener('click', showLoginForm);