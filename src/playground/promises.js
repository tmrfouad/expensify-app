const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('this is my first promise');
    // reject('something went wrong!');
  }, 3000);
});

console.log('before');

promise
  .then(data => {
    console.log(data);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('this is my second promise');
      }, 3000);
    });
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.log(error);
  });

console.log('after');
