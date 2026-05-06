function countVowels(word) {
  const vowels = "aeoui";
  let count = 0;

  for (const letter of word.toLowerCase()) {
    if (vowels.includes(letter)) {
      count++;
    }
  }
    return count;
}

console.log(countVowels("Aerodynamics"));

