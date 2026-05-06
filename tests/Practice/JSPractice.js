// sum of number from arr
const numbers = [1, 2, 3, 4];

let sum = 0;

for (const num of numbers) {
  sum = sum + num;
}

console.log(sum); // 10

// reduce - goes through arr, acc - result which increasing, num - number that added to acc
const sum2 = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum2);

// Find max number
const numbers2 = [3, 7, 2, 9, 1];

let max = numbers2[0];

for (const num of numbers2) {
  if (num > max) {
    max = num;
  }
}

console.log(max); // 9

// Find text
const text = "API returned error";
if (text.includes("error")) {
  console.log("Found error");
}

// Work with object
const user = {
  id: 1,
  name: "Alex",
  age: 25,
  role: "QA",
};

console.log(user["name"]);
console.log(user.role);
// if user object have id field
if (user.id !== undefined) {
  console.log("id exists");
} else {
  console.log("id is missing");
}

// Simple function
function isAdult(age) {
  return age >= 18;
}

console.log(isAdult(20)); // true
console.log(isAdult(15)); // false

// Check status code
function checkStatus(status) {
  if (status === 200) {
    return "OK";
  } else {
    return "Error";
  }
}
console.log(checkStatus(200))