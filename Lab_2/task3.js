let grade = 78;   

function getGradeIf(score) {

    if (score >= 90 && score <= 100) {
        return "Відмінно";
    } else if (score >= 75 && score < 90) {
        return "Добре";
    } else if (score >= 60 && score < 75) {
        return "Задовільно";
    } else if (score >= 0 && score < 60) {
        return "Незадовільно";
    } else {
        return "Некоректна оцінка";
    }
}

console.log("Оцінка через if:", getGradeIf(grade));

let grade2 = 92;  

let gradeResult = (grade2 >= 90 && grade2 <= 100) ? "Відмінно" :
                  (grade2 >= 75) ? "Добре" :
                  (grade2 >= 60) ? "Задовільно" :
                  (grade2 >= 0) ? "Незадовільно" :
                  "Некоректна оцінка";

console.log("Оцінка через ? :", gradeResult);


let month = 11;   

function getSeason(monthNumber) {

    if (monthNumber >= 1 && monthNumber <= 12) {

        if (monthNumber === 12 || monthNumber === 1 || monthNumber === 2) {
            return "Зима";
        } else if (monthNumber >= 3 && monthNumber <= 5) {
            return "Весна";
        } else if (monthNumber >= 6 && monthNumber <= 8) {
            return "Літо";
        } else {
            return "Осінь";
        }

    } else {
        return "Некоректний номер місяця";
    }
}
console.log("Пора року:", getSeason(month));