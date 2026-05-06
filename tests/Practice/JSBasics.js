// Varriable can be changed
let A = 10;

// Varriable can not be changed
const name = "John";
const B = 15;

// Default functions
function sum(a, b) {
  return a + b;
}

// Arrow function
const sum2 = (a, b) => a + b;

// function with if/else
function age(a) {
  if (a >= 18) {
    return "adult";
  } else return "kid";
}

// Check functionality of "sum" function
console.log("Sum of entered numbers: ", sum(A, B));

// Arrays
const arr = [1, 2, 3, 4, 5, "4"];
const user = {
  name: "John",
  age: 10,
};

console.log(arr, user);

// array methods conversion, filter and search
const conversion = arr.map((x) => x * 2);
const filter = arr.filter((x) => x > 1 && x < 4);
const find = arr.find((x) => x === 4);

// Default loop "for"
for (let i = 0; i <= 5; i++) {
  console.log("Default loop item", i);
}

// Modern loop "for"
const arr2 = [1, 2, 3];
for (const item of arr2) {
  console.log("Item", item);
}

// Loop "while"
let i = 0;
while (i <= 5) {
  console.log("While loop: ", i);
  i++;
}

// Loop "do..while"
let a = 0;
do {
  console.log("Do..while loop: ", a);
  a++;
} while (a <= 5);

console.log(conversion);
console.log(filter);
console.log(find);

console.log(age(8));

console.log(sum2(1, 2));
