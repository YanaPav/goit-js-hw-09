import Notiflix from 'notiflix'

const form = document.querySelector('.form')
form.addEventListener('submit', onFormSubmit)

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {

    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);    
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    },delay)
    
  })
  
}

function onFormSubmit(e) {
  e.preventDefault()
  const firstDelay = Number(e.currentTarget.elements.delay.value)
  const stepValue = Number(e.currentTarget.elements.step.value)
  const amount = Number(e.currentTarget.elements.amount.value)

  for (let i = 0; i < amount; i += 1) {
    const step = firstDelay + stepValue * i
    const position = i + 1
    
      createPromise(position, step)
      .then(value => { Notiflix.Notify.success(value) })
      .catch(error => { Notiflix.Notify.failure(error) })  
  }

}
