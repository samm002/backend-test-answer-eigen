// Reverse Alfabet

const word = "NEGIE1";
let reversedWord = "";

for (let i = word.length - 2; i >= 0; i--) {
  reversedWord += word[i];
}

reversedWord += word[word.length - 1];

console.log(reversedWord);
