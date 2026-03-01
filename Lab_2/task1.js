// Лабораторна робота №2
// Завдання 1. Оператори порівняння

// 1.1 Функція, яка знаходить мінімальний та максимальний елемент масиву
function findMinMax(arr) {
    let min = arr[0];
    let max = arr[0];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i];
        }

        if (arr[i] > max) {
            max = arr[i];
        }
    }

    return {
        min: min,
        max: max
    };
}

// перевірка роботи функції
let numbers = [4, 15, -2, 8, 0, 23];
let minMaxResult = findMinMax(numbers);

console.log("Мінімальне значення:", minMaxResult.min);
console.log("Максимальне значення:", minMaxResult.max);


// 1.2 Порівняння двох об’єктів за їх властивостями
function compareObjects(obj1, obj2) {
    if (obj1.age === obj2.age && obj1.score === obj2.score) {
        return "Об'єкти рівні за властивостями";
    } else {
        return "Об'єкти не рівні за властивостями";
    }
}

// об’єкти для порівняння
let student1 = {
    name: "Олексій",
    age: 19,
    score: 85
};

let student2 = {
    name: "Марія",
    age: 19,
    score: 85
};

// перевірка
console.log(compareObjects(student1, student2));