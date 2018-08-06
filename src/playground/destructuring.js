//
// Object destructuring
//

// const person = {
//   age: 35,
//   location: {
//     city: 'Cairo',
//     temp: 45
//   }
// };

// const { name: firstName = 'Anonymous', age, location } = person;
// const { city, temp: temperature } = location;

// console.log(`${firstName} is ${age} years old.`);
// console.log(`It's ${temperature} in ${city}.`);

// const book = {
//   title: 'Ego is the Enemy',
//   author: 'Ryan Holiday',
//   publisher: {
//     // name: 'Penguin'
//   }
// }

// const {name: publisherName = 'Self-Published'} = book.publisher;

// console.log(publisherName);

//
// Array destructuring
//

// const address = ['21 Jump Street', 'Cairo', 'Egypt', '12345'];
// const [street, city, country = 'USA', zipcode] = address;
// console.log(`You are in ${city} ${country}`);

const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];

const [itemName, , mediumPrice] = item;
console.log(`A medium ${itemName} costs ${mediumPrice}.`);
