import _ from 'lodash';

const STORAGE_KEY = 'feedback-form-state';
const email = document.querySelector('.feedback-form input');
const message = document.querySelector('.feedback-form textarea');
const submit = document.querySelector('.feedback-form button');
const form = document.querySelector('.feedback-form');

class Data {
  constructor(user, message) {
    this.user = user, 
    this.message = message
  }
}

const save = (key, input) => {
  localStorage.setItem(key, input);
};
const load = key => {
  const data = localStorage.getItem(key);
  if (data === null) {
    return undefined;
  } else {
    return data;
  }
};
const clear = key => {
  localStorage.removeItem(key);
};

const setValue = key => {
  const currentState = load(STORAGE_KEY);
  if (currentState !== undefined){
    const value = load(key);
    const json = JSON.parse(value);
    email.value = json.user;
    message.value = json.message;
  }
};

const handleClick = e => {
  e.preventDefault();
  const data = new Data(email.value, message.value);
  console.log(data);
  form.reset();
  clear(STORAGE_KEY);
};

form.addEventListener(
  'change',
  _.debounce(() => {
    const data = new Data(email.value, message.value);
    const json = JSON.stringify(data);
    save(STORAGE_KEY, json);
  }, 2000)
);

window.addEventListener('load', () => {
  setValue(STORAGE_KEY);
});

submit.addEventListener('click', handleClick);
