//Task 1
function sortAndSearchFruitsArray() {
  const fruits = ["яблуко", "банан", "вишня", "груша", "манго"];
 
  /*fruits.pop();
  console.log("Завдання 1.1 — Після видалення останнього елемента:", fruits);
 
  fruits.unshift("ананас");
 
  fruits.sort((a, b) => b.localeCompare(a, "uk"));
  console.log("Завдання 1.3 — Відсортовано у зворотньому порядку:", fruits);
 
  const index = fruits.indexOf("яблуко");
  console.log("Завдання 1.4 — Індекс елемента 'яблуко':", index);
*/
}
 
//Task 2
function filterAndJoinColorsArray() {
  const colors = ["червоний", "синій", "зелений", "темно-синій", "жовтий", "синьо-фіолетовий"];
 
  const longest = colors.reduce((a, b) => (a.length >= b.length ? a : b));
  const shortest = colors.reduce((a, b) => (a.length <= b.length ? a : b));
  console.log("Завдання 2.2 — Найдовший:", longest, "| Найкоротший:", shortest);
 
  const filtered = colors.filter((c) => c.includes("синій"));
  console.log("Завдання 2.3 — Тільки 'синій':", filtered);
 
  const joined = filtered.join(", ");
  console.log("Завдання 2.4-5 — Об'єднаний рядок:", joined);
}
 
//Task 3
function sortAndFilterEmployeesArray() {
  let employees = [
    { name: "Олена", age: 30, position: "менеджер" },
    { name: "Андрій", age: 25, position: "розробник" },
    { name: "Василь", age: 45, position: "розробник" },
    { name: "Ірина", age: 28, position: "дизайнер" },
    { name: "Богдан", age: 52, position: "директор" },
  ];
 
  employees.sort((a, b) => a.name.localeCompare(b.name, "uk"));
  console.log("Завдання 3.2 — Відсортовано за іменем:", employees.map((e) => e.name));
 
  const devs = employees.filter((e) => e.position === "розробник");
  console.log("Завдання 3.3 — Розробники:", devs);
 
  employees = employees.filter((e) => e.age <= 50);
  console.log("Завдання 3.4 — Після видалення (вік > 50):", employees.map((e) => e.name));
 
  employees.push({ name: "Тетяна", age: 33, position: "тестувальник" });
  console.log("Завдання 3.5 — Оновлений масив:", employees);
}
 
//Task 4 
function sortAndSearchStudentsArray() {
  let students = [
    { name: "Олексій", age: 20, course: 2 },
    { name: "Марія", age: 22, course: 3 },
    { name: "Дмитро", age: 19, course: 1 },
    { name: "Юлія", age: 21, course: 3 },
    { name: "Сергій", age: 23, course: 4 },
  ];
 
  students = students.filter((s) => s.name !== "Олексій");
  console.log("Завдання 4.2 — Після видалення Олексія:", students.map((s) => s.name));
 
  students.push({ name: "Наталія", age: 20, course: 2 });
  console.log("Завдання 4.3 — Після додавання Наталії:", students.map((s) => s.name));
 
  students.sort((a, b) => b.age - a.age);
  console.log("Завдання 4.4 — Відсортовано за віком:", students.map((s) => `${s.name}(${s.age})`));
 
  const thirdCourse = students.find((s) => s.course === 3);
  console.log("Завдання 4.5 — Студент 3-го курсу:", thirdCourse);
}
 
//Task 5
function mapFilterReduceNumbersArray() {
  let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
 
  const squared = numbers.map((n) => n ** 2);
  console.log("Завдання 5.1 — Квадрати:", squared);
 
  const evens = numbers.filter((n) => n % 2 === 0);
  console.log("Завдання 5.2 — Парні:", evens);
 
  const sum = numbers.reduce((acc, n) => acc + n, 0);
  console.log("Завдання 5.3 — Сума:", sum);
 
  const extra = [11, 12, 13, 14, 15];
  numbers = [...numbers, ...extra];
  console.log("Завдання 5.4 — Після додавання 5 чисел:", numbers);
 
  numbers.splice(0, 3);
  console.log("Завдання 5.5 — Після splice (видалено перші 3):", numbers);
}
 
//Task 6
function libraryManagement() {
  let books = [
    { title: "Кобзар", author: "Тарас Шевченко", genre: "поезія", pages: 240, isAvailable: true },
    { title: "Тіні забутих предків", author: "Михайло Коцюбинський", genre: "повість", pages: 120, isAvailable: false },
    { title: "Лісова пісня", author: "Леся Українка", genre: "драма", pages: 95, isAvailable: true },
    { title: "Захар Беркут", author: "Іван Франко", genre: "повість", pages: 160, isAvailable: true },
    { title: "Місто", author: "Валер'ян Підмогильний", genre: "роман", pages: 310, isAvailable: false },
  ];
 
  function addBook(title, author, genre, pages) {
    books.push({ title, author, genre, pages, isAvailable: true });
  }
 
  function removeBook(title) {
    books = books.filter((b) => b.title !== title);
  }
 
  function findBooksByAuthor(author) {
    return books.filter((b) => b.author === author);
  }
 
  function toggleBookAvailability(title, isBorrowed) {
    const book = books.find((b) => b.title === title);
    if (book) book.isAvailable = !isBorrowed;
  }
 
  function sortBooksByPages() {
    books.sort((a, b) => a.pages - b.pages);
  }
 
  function getBooksStatistics() {
    const total = books.length;
    const available = books.filter((b) => b.isAvailable).length;
    const borrowed = total - available;
    const avgPages = Math.round(books.reduce((acc, b) => acc + b.pages, 0) / total);
    return { total, available, borrowed, avgPages };
  }
 
  addBook("Нечуй-Левицький: Кайдашева сім'я", "Іван Нечуй-Левицький", "повість", 200);
  console.log("Завдання 6 — Після addBook:", books.map((b) => b.title));
 
  removeBook("Місто");
  console.log("Завдання 6 — Після removeBook('Місто'):", books.map((b) => b.title));
 
  const byFranko = findBooksByAuthor("Іван Франко");
  console.log("Завдання 6 — Книги Франка:", byFranko);
 
  toggleBookAvailability("Кобзар", true);
  console.log("Завдання 6 — Кобзар isAvailable:", books.find((b) => b.title === "Кобзар").isAvailable);
 
  sortBooksByPages();
  console.log("Завдання 6 — Відсортовано за сторінками:", books.map((b) => `${b.title}(${b.pages})`));
 
  const stats = getBooksStatistics();
  console.log("Завдання 6 — Статистика:", stats);
}
 
// Task 7
function addAndDeleteStudentObjectProperties() {
  const student = { name: "Іван", age: 21, course: 3 };
 
  student.subjects = ["Математика", "Фізика", "Програмування", "Англійська"];
 
  delete student.age;
 
  console.log("Завдання 7 — Оновлений об'єкт студента:", student);
}
 
//Викликaю функції
sortAndSearchFruitsArray();
filterAndJoinColorsArray();
sortAndFilterEmployeesArray();
sortAndSearchStudentsArray();
mapFilterReduceNumbersArray();
libraryManagement();
addAndDeleteStudentObjectProperties();
 