let number = 12;
let minValue = 5;
let maxValue = 20;

function isInRange(num, min, max) {

    if (num >= min && num <= max) {
        return "Число знаходиться в діапазоні";
    } else {
        return "Число НЕ знаходиться в діапазоні";
    }
}

console.log(isInRange(number, minValue, maxValue));

let isOnline = true;

console.log("Було:", isOnline);

isOnline = !isOnline;

console.log("Стало:", isOnline);