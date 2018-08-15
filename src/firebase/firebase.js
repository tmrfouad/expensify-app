import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDiAo9tfdi7GkCLBr8Jr3XxWcNmKfF4l-0',
  authDomain: 'tmrfouad-expensify.firebaseapp.com',
  databaseURL: 'https://tmrfouad-expensify.firebaseio.com',
  projectId: 'tmrfouad-expensify',
  storageBucket: 'tmrfouad-expensify.appspot.com',
  messagingSenderId: '911444951293'
};

firebase.initializeApp(config);

const database = firebase.database();

database
  .ref('expenses')
  .once('value')
  .then(snapshot => {
    const expenses = [];
    snapshot.forEach(childSnapshot => {
      expenses.push({
        id: childSnapshot.key,
        ...childSnapshot.val()
      });
    });
    console.log(expenses);
  });

// database.ref('expenses').push({
//   description: 'Water bill',
//   notes: 'Water bill',
//   amount: 30000,
//   createdAt: 2000
// });

// database.ref('notes').push({
//   title: 'course topics',
//   body: 'react native, angular, python'
// });

// database.ref().on('value', snapshot => {
//   const employee = snapshot.val();
//   console.log(
//     `${employee.name} is a ${employee.job.title} at ${employee.job.company}`
//   );
// });

// const onValueChange = database.ref().on(
//   'value',
//   snapshot => {
//     console.log(snapshot.val());
//   },
//   error => console.log('error : ', error)
// );

// setTimeout(() => {
//   database.ref('age').set(39);
// }, 3500);

// setTimeout(() => {
//   database.ref().off(onValueChange);
// }, 7000);

// setTimeout(() => {
//   database.ref('age').set(35);
// }, 10500);

// database
//   .ref('location/city')
//   .once('value')
//   .then(snapshot => {
//     console.log(snapshot.val());
//   })
//   .catch(error => console.log('error : ', error));

// database
//   .ref()
//   .set({
//     name: 'Tamer Fouad',
//     age: 35,
//     stresslevel: 8,
//     job: {
//       title: 'Software developer',
//       company: 'Hindawi'
//     },
//     location: {
//       city: 'Cairo',
//       country: 'Egypt'
//     }
//   })
//   .then(() => console.log('data is saved!'))
//   .catch(error => {
//     console.log(error);
//   });

// database.ref().update({
//   stresslevel: 10,
//   'job/company': 'Amazon',
//   'location/city': 'Alex'
// });

// database
//   .ref()
//   .remove()
//   .then(() => {
//     console.log('isSingle is removed!');
//   })
//   .catch(error => {
//     console.log('Error: ', error);
//   });
