// Завдання 1
function sumFibonacci() {
  let a = 0;
  let b = 1;
  let suma = 0;
  let count = 0;

  while (count < 10) {
    suma += a;
    let temp = a + b;
    a = b;
    b = temp;
    count++;
  }

  console.log("Завдання 1:", suma);
}

// Завдання 2
function sumPrimeNumbers() {
  function eProste(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
    }
    return true;
  }

  let suma = 0;
  for (let i = 2; i <= 1000; i++) {
    if (eProste(i)) {
      suma += i;
    }
  }

  console.log("Завдання 2:", suma);
}

// Завдання 3
function getDayOfWeek(chyslo) {
  let den;
  switch (chyslo) {
    case 1: den = "Понеділок"; break;
    case 2: den = "Вівторок";  break;
    case 3: den = "Середа";    break;
    case 4: den = "Четвер";    break;
    case 5: den = "П'ятниця";  break;
    case 6: den = "Субота";    break;
    case 7: den = "Неділя";    break;
    default: den = "Невірне число";
  }
  console.log("Завдання 3:", den);
}

// Завдання 4
function convertarray(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].length % 2 !== 0) {
      result.push(arr[i]);
    }
  }
  console.log("Завдання 4:", result);
  return result;
}

// Завдання 5
const incrementArray = (arr) => {
  let result = arr.map(n => n + 1);
  console.log("Завдання 5:", result);
  return result;
};

// Завдання 6
function checkSumOrDiff(a, b) {
  let result = (a + b === 10) || (Math.abs(a - b) === 10);
  console.log("Завдання 6:", result);
  return result;
}

// виклики функцій
sumFibonacci();
sumPrimeNumbers();
getDayOfWeek(3);
convertarray(["hi", "hello", "ok", "world", "JS", "code"]);
incrementArray([1, 5, 10, 23, 0]);
checkSumOrDiff(6, 4);