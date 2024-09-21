// Mencari value dan lenght dari string terpanjang 

const sentence = "Saya sangat senang mengerjakan soal algoritma";

const words = sentence.split(" ");

const maxLength = words.reduce(
  (accumulator, currentValue) => {
    // check first index until last index of word and return the longest value
    if (accumulator.length >= currentValue.length) {
      return accumulator;
    }

    return { length: currentValue.length, word: currentValue };
  },
  { length: 0, word: "" } // initial value
);

console.log(`${maxLength.word}: ${maxLength.length} character`);
