import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btnRef = document.querySelector('.js-promise-btn');
const formRef = document.querySelector('.form');

btnRef.addEventListener('click', onCreatePromise);

function onCreatePromise(evt) {
evt.preventDefault();
const formData = new FormData(formRef);
let delay = Number(formData.get("delay"));
const step = Number(formData.get("step"));
const amount = Number(formData.get("amount"));
let position = 1;


setTimeout(()=>{


  createPromise(position, delay) //First promise
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
  
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      })
      delay += step;


  let intervalId = setInterval(()=>{

    if (position < amount)
    {
      position += 1;
      
      createPromise(position, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
  
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      })
      delay += step;
      return;
    }
    clearInterval(intervalId);
  
  },step)
}

, delay)


}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject)=> {
    if (shouldResolve) {
      resolve({position, delay});
      // Fulfill
      
    } else {
      reject({position, delay});
      // Reject
    }
  })
  
}