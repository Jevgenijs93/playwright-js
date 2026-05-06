const { log } = require("node:console");

function countPrimes(A, B) {
  let primesCount = 0;

  // loop through all numbers from A to B
  for (let number = A; number <= B; number++) {
    // assume the number is prime
    let isPrime = true;

    // 0 and 1 are not prime numbers
    if (number < 2) {
      isPrime = false;
    }

    // check if the number has any divisors
    for (let divisor = 2; divisor < number; divisor++) {
      if (number % divisor === 0) {
        isPrime = false; // found a divisor → not prime
        break; // no need to continue checking
      }
    }

    // if still prime, increase the counter
    if (isPrime) {
      console.log(number);
      primesCount++;
    }
  }

  return primesCount;
}

console.log("Count of numbers:", countPrimes(11, 19));
