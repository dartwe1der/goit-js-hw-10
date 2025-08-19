import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const delay = Number(formData.get('delay'));
  const state = formData.get('state');

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then((delayVal) => {
      console.log(`✅ Fulfilled promise in ${delayVal}ms`);
      iziToast.success({
        title: 'Success',
        message: `Fulfilled promise in ${delayVal}ms`,
        position: 'topRight',
      });
    })
    .catch((delayVal) => {
      console.log(`❌ Rejected promise in ${delayVal}ms`);
      iziToast.error({
        title: 'Error',
        message: `Rejected promise in ${delayVal}ms`,
        position: 'topRight',
      });
    });
});