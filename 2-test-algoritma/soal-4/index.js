// Pengurangan dari penjumlahan diagonal matriks

const matriks = [
  [1, 2, 0],
  [4, 5, 6],
  [7, 8, 9],
];
const matriksLength = matriks[0].length;

let diagonalPertama = [];
let diagonalKedua = [];
let diagonalPertamaResult = 0;
let diagonalKeduaResult = 0;

for (let i = 0; i < matriksLength; i++) {
  for (let j = 0; j < matriksLength; j++) {
    if (i == j) {
      diagonalPertama.push(matriks[i][j]);
      diagonalPertamaResult += matriks[i][j];
    }

    if (i + j == matriksLength - 1) {
      diagonalKedua.push(matriks[i][j]);
      diagonalKeduaResult += matriks[i][j];
    }
  }
}

console.log("Matriks =", matriks);
console.log(`\nHasil penjumlahan diagonal pertama : ${diagonalPertama.join(' + ')} = ${diagonalPertamaResult}`);
console.log(`Hasil penjumlahan diagonal kedua   : ${diagonalKedua.join(' + ')} = ${diagonalKeduaResult}`);

console.log(`\nHasil pengurangan diagonal matriks : ${diagonalPertamaResult} - ${diagonalKeduaResult} = ${diagonalPertamaResult - diagonalKeduaResult}`);
