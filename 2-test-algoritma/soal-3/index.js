// Mencari berapa kali value 'QUERY' terdapat pada array 'INPUT'

const INPUT = ["xc", "dz", "bbb", "dz"];
const QUERY = ["bbb", "ac", "dz"];

let queryWordCount = [];

for (let query of QUERY) {
  let count = 0;
  for (let input of INPUT) {
    if (query === input) {
      count++;
    }
  }
  queryWordCount.push(count);
}

console.log(queryWordCount);
console.log("\nKeterangan :");

for (let query in QUERY) {
  console.log(`Terdapat ${queryWordCount[query]} kata '${QUERY[query]}' pada INPUT`);
}
