import './styles/style.css';

const form = document.getElementsByTagName('form')[0];
const email = document.getElementById('email');
const emailError = document.querySelector('#email + span.error');
const country = document.getElementById('country');
const countryError = document.querySelector('#country + span.error');
const postCode = document.getElementById('post-code');
const postCodeError = document.querySelector('#post-code + span.error');
const password = document.getElementById('password');
const passwordError = document.querySelector('#password + span.error');
const passwordConfirm = document.getElementById('password-confirm');
const passwordConfirmError = document.querySelector('#password-confirm + span.error');

function showEmailError() {
  if (email.validity.valueMissing) {
    emailError.textContent = 'You need to enter an email address.';
  } else if (email.validity.typeMismatch) {
    emailError.textContent = 'Entered value needs to be an email address.';
  } else if (email.validity.tooShort) {
    emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
  }
  emailError.className = 'error active';
}

function showCountryError() {
  countryError.textContent = 'You need to select a country.';
  countryError.className = 'error active';
}

function showPostCodeError() {
  if (postCode.validity.valueMissing) {
    postCodeError.textContent = 'Please enter a postcode.';
  } else if (!postCode.validity.patternMistmatch) {
    postCodeError.textContent = 'You need to enter a UK-format postcode.';
  }
  postCodeError.className = 'error active';
}

function showPasswordError() {
  if (password.validity.valueMissing) {
    passwordError.textContent = 'Please enter your password.';
  } else if (!password.validity.patternMistmatch) {
    passwordError.textContent = 'Please ensure your password contains one uppercase letter, one lowercase letter, one number and a special character';
  }
  passwordError.className = 'error active';
}

function showPasswordConfirmError() {
  if (passwordConfirm.value !== password.value) {
    passwordConfirmError.textContent = 'Please ensure your password matches';
  } else if (passwordConfirm.validity.valueMissing) {
    passwordConfirmError.textContent = 'Please re-type your password to confirm';
  }
  passwordConfirmError.className = 'error active';
}

email.addEventListener('input', () => {
  if (email.validity.valid) {
    emailError.textContent = '';
    emailError.className = 'error';
  } else {
    showEmailError();
  }
});

country.addEventListener('change', (event) => {
  if (event.target.value === '0') {
    showCountryError(event.target.value);
  } else {
    countryError.textContent = '';
    countryError.className = 'error';
  }
});

postCode.addEventListener('input', () => {
  if (postCode.validity.valid) {
    postCodeError.textContent = '';
    postCodeError.className = 'error';
  } else {
    showPostCodeError();
  }
});

password.addEventListener('input', (event) => {
  if (password.validity.valid) {
    passwordError.textContent = '';
    passwordError.className = 'error';
  } else {
    showPasswordError();
  }
});

passwordConfirm.addEventListener('input', (event) => {
  if (passwordConfirm.validity.valid && passwordConfirm.value === password.value) {
    passwordConfirmError.textContent = '';
    passwordConfirmError.className = 'error';
  } else {
    showPasswordConfirmError();
  }
});

form.addEventListener('submit', (event) => {
  if (!email.validity.valid) {
    showEmailError();
    event.preventDefault();
  } else if (country.value === '0') {
    showCountryError(country.value);
    event.preventDefault();
  } else if (!postCode.validity.valid) {
    showPostCodeError();
    event.preventDefault();
  } else if (!password.validity.valid) {
    showPasswordError();
    event.preventDefault();
  } else if (!passwordConfirm.validity.valid || passwordConfirm.value !== password.value) {
    showPasswordConfirmError();
    event.preventDefault();
  }
});
