const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve('this is my resolved data');
    // resolve('this is other my resolved data');
    reject('something went wrong!');
  }, 3000);
});

console.log('before');

promise
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.log(error);
  });

console.log('after');
