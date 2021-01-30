import './styles/style.css';

const form = document.getElementsByTagName('form')[0];
const email = document.getElementById('email');
const emailError = document.querySelector('#email + span.error');
const country = document.getElementById('country');
const countryError = document.querySelector('#country + span.error');
// const postCode = document.getElementById('post-code');
// const postCodeError = document.querySelector('#post-code + span.error');

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

function showCountryError(selection = country.value) {
  countryError.textContent = 'You need to select a country.';
  countryError.className = 'error active';
}

// function showPostCodeError() {
//   if (postCode.validity.valueMissing) {
//     postCodeError.textContent = 'You need to enter a postcode.';
//   }
//   postCodeError.className = 'error active';
// }

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

// postCode.addEventListener('input', () => {
//   if (postCode.validity.valid) {
//     postCodeError.textContent = '';
//     postCodeError.className = 'error';
//   } else {
//     showPostCodeError();
//   }
// });

form.addEventListener('submit', (event) => {
  if (!email.validity.valid) {
    showEmailError();
    event.preventDefault();
  } else if (country.value === '0') {
    showCountryError(country.value);
    event.preventDefault();
  }
});
