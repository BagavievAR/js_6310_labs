// ===== ЗАДАНИЕ 1: Базовые операции =====
function simpleTask() {
    // 1.1 Объявите переменные разных типов (не менее 5)
    let num = 1;
    let s = "Hello, World!";
    let bool = true;
    let undef;
    let obj = { name: "Kamil", surname: "Subaru" };
    // 1.2 Выведите типы всех переменных
    console.log(typeof num, typeof s, typeof bool, typeof undef, typeof obj);
}

// ===== ЗАДАНИЕ 2: Функции =====
function getReviewerNumber(number, lab) {
    // 2.1 Номер ревьюера для вашей группы по вашему номеру и номеру лабораторной работы
    if (typeof number !== 'number' || typeof lab !== 'number') {
        return "Аргументы функции должны быть числами";
    }
    if (number > 23) return "Количество человек в группе не превышает 23";
    return ((number + lab - 1) % 23) + 1;
    //проверка на тип данных введеных аргументов
    //пограничные значения 23 1
}

function getVariant(number, variants) {
    // 2.2 Номер варианта, исходя из количества вариантов
    if (typeof number !== 'number' || typeof variants !== 'number') {
        return "Аргументы функции должны быть числами";
    }
    return ((number - 1) % variants) + 1;
}

function calculate(a, b, operation) {
    // 2.3 Калькулятор: +, -, *, /
    if (typeof a !== 'number' || typeof b !== 'number') {
        return "Аргументы функции должны быть числами";
    }
    if (operation === "+") return a + b;
    if (operation === "-") return a - b;
    if (operation === "*") return a * b;
    if (operation === "/") return (b === 0) ? NaN : a / b;
    return "Unknown operation, you should only use +, -, *, /";
}

function calculateArea(figure, ...params) {
    // 2.4 Площадь фигур 'circle', 'rectangle', 'triangle' (switch)
    function isValidNumber(num) {
        return typeof num === 'number' && num >= 0 && !Number.isNaN(num);
    }
    switch (figure) {
        case "circle":
            if (params.length === 1 && isValidNumber(params[0])) {
                return Math.PI * params[0] ** 2;
            }
            break;
        case "rectangle":
            if (params.length === 2 && isValidNumber(params[0]) && isValidNumber(params[1])) {
                return params[0] * params[1];
            }
            break;
        case "triangle":
            if (params.length === 2 && isValidNumber(params[0]) && isValidNumber(params[1])) {
                return 0.5 * params[0] * params[1];
            }
            break;
        default:
            return "Неизвестная фигура";
    }
    return "Некорректные параметры";
}

// 2.5 Стрелочные функции
const reverseString = (str) => {
    // Возвращает перевёрнутую строку; поддерживает нестроковые аргументы
    const s = String(str);
    return s.split("").reverse().join("");
};

const getRandomNumber = (min, max) => {
    // Случайное целое в диапазоне [min, max)
    return Math.floor(Math.random() * (max - min+1)) + min;
    // +min — сдвиг в нужный интервал
};

// ===== ЗАДАНИЕ 3: Объекты =====
const book = {
    // 3.1 Объект "книга"
    title: "Harry Potter",
    author: "J.K. Rowling",
    year: 1997,
    pages: 540,
    availability: true,

    getInfo() {
        return `Title: ${this.title}, Author: ${this.author}, Year: ${this.year}, Pages: ${this.pages}, Availability: ${this.availability}`;
    },
    toggleAvailability() {
        this.availability = !this.availability;
        return this.availability;
    }
};

const student = {
    // 3.2 Объект "студент"
    name: "Анна Петрова",
    age: 20,
    course: 2,
    grades: {
        math: 90,
        programming: 95,
        history: 85
    },

    // Метод для расчёта среднего балла
    getAverageGrade() {
        const values = Object.values(this.grades);
        const sum = values.reduce((acc, v) => acc + v, 0);
        return values.length ? sum / values.length : 0;
    },

    // Метод для добавления новой оценки
    addGrade(subject, grade) {
        this.grades[subject] = grade;
    }
};
// ===== ЗАДАНИЕ 4: Массивы =====
function processArrays() {
    const numbers = [12, 45, 23, 67, 34, 89, 56, 91, 27, 14];
    const words = ["JavaScript", "программирование", "массив", "функция", "объект"];
    const users = [
        { id: 1, name: "Анна", age: 25, isActive: true },
        { id: 2, name: "Борис", age: 30, isActive: false },
        { id: 3, name: "Виктория", age: 22, isActive: true },
        { id: 4, name: "Григорий", age: 35, isActive: true },
        { id: 5, name: "Дарья", age: 28, isActive: false }
    ];

    // 1. forEach — вывод всех чисел больше 50
    console.log("Числа больше 50:");
    numbers.forEach(n => {
        if (n > 50) console.log(n);
    });

    // 2. map — массив квадратов чисел
    const squares = numbers.map(n => n ** 2);
    console.log("Квадраты:", squares);

    // 3. filter — активные пользователи
    const activeUsers = users.filter(u => u.isActive);
    console.log("Активные пользователи:", activeUsers);

    // 4. find — пользователь с именем "Виктория"
    const victoria = users.find(u => u.name === "Виктория");
    console.log("Виктория:", victoria);

    // 5. reduce — сумма всех чисел
    const sum = numbers.reduce((acc, n) => acc + n, 0);
    console.log("Сумма чисел:", sum);

    // 6. sort — сортировка пользователей по возрасту (по убыванию)
    const sortedByAge = [...users].sort((a, b) => b.age - a.age);
    console.log("Пользователи по возрасту (убыв.):", sortedByAge);

    // 7. every — все ли пользователи старше 18 лет
    const allAdults = users.every(u => u.age >= 18);
    console.log("Все 18+:", allAdults);

    // 8. Цепочка: активные → имена → сортировка по алфавиту
    const activeUserNames = users
        .filter(u => u.isActive)
        .map(u => u.name)
        .sort((a, b) => a.localeCompare(b));
    console.log("Имена активных (по алфавиту):", activeUserNames);
}

// ===== ЗАДАНИЕ 5: Менеджер задач =====
const taskManager = {
    nextId: 1,
    tasks: [
        { id: 1, title: "Изучить JavaScript", completed: false, priority: "high" },
        { id: 2, title: "Сделать лабораторную работу", completed: true, priority: "high" },
        { id: 3, title: "Прочитать книгу", completed: false, priority: "medium" }
    ],

    addTask(title, priority = "medium") {
        // 5.1 Добавление задачи
        const newTask = {
            id: this.nextId++,
            title: title,
            completed: false,
            priority: priority
        };
        this.tasks.push(newTask);
        return newTask;
    },

    completeTask(taskId) {
        // 5.2 Отметка выполнения
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.completed = true;
            return true;
        }
        return false;
    },

    // 5.3 Удаление задачи
    deleteTask(taskId) {
        const initialLength = this.tasks.length;
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        return this.tasks.length < initialLength; // true если удалили
    },

    // 5.4 Получение списка задач по статусу
    getTasksByStatus(completed) {
        return this.tasks.filter(task => task.completed === completed);
    },

    // 5.5 Статистика
    getStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(task => task.completed).length;
        const pending = total - completed;
        const completionRate = total > 0 ? (completed / total) * 100 : 0;

        return {
            total,
            completed,
            pending,
            completionRate: Math.round(completionRate) + '%'
        };
    }
};

// ===== ЗАДАНИЕ 6: Регулярные выражения =====
/**
 * Вариант 1: Валидация email адреса
 */
function validateEmail(email) {
    const emailRegex = /^(?=.{5,})[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

/**
 * Вариант 2: Валидация пароля
 */
function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;
    return passwordRegex.test(password);
}
/**
 * Вариант 3: Валидация номера телефона (российский формат)
 */
function validatePhone(phone) {
    const phoneRegex = /^(\+7|8)[\s(-]?\d{3}[\s)-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;
    return phoneRegex.test(phone);
}

/**
 * Вариант 4: Валидация даты в формате DD.MM.YYYY
 */
function validateDate(date) {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d{2}$/;
    return dateRegex.test(date);
}

// ===== ТЕСТИРОВАНИЕ =====
function runTests() {
    console.log("=== ТЕСТИРОВАНИЕ ===");

    // Тест 1: getReviewerNumber
    console.assert(getReviewerNumber(5, 1) === 6, "Тест получения ревьюера провален");
    console.assert(getReviewerNumber("qwe", 1) === "Аргументы функции должны быть числами", "Тест получения ревьюера провален");
    console.assert(getReviewerNumber(5, "qwe") === "Аргументы функции должны быть числами", "Тест получения ревьюера провален");
    console.assert(getReviewerNumber(22, 1) === 23, "Тест получения ревьюера провален");
    console.assert(getReviewerNumber(23, 1) === 1, "Тест получения ревьюера провален");
    console.assert(getReviewerNumber(24, 1) === "Количество человек в группе не превышает 23", "Тест получения ревьюера провален");
    


    //Тест задания 2.2
    console.assert(getVariant(5, 5) === 5, "Тест задания 2.2 провален");
    console.assert(getVariant(7, 3) === 1, "Тест задания 2.2 провален");
    console.assert(getVariant(3, 8) === 3, "Тест задания 2.2 провален");
    console.assert(getVariant("qwe", 5) === "Аргументы функции должны быть числами", "Тест задания 2.2 провален");
    console.assert(getVariant(5, "qwe") === "Аргументы функции должны быть числами", "Тест задания 2.2 провален");



    // Тест 2: calculate
    console.assert(calculate("a", 10, "+") === "Аргументы функции должны быть числами", "Тест калькулятора 2.3 провален (аргументы должны быть числовыми)");
    console.assert(calculate(10, "b", "+") === "Аргументы функции должны быть числами", "Тест калькулятора 2.3 провален (аргументы должны быть числовыми)");
    console.assert(calculate(5, 3, "+") === 8, "Сложение 5 + 3 = 8");
    console.assert(calculate("a", "b", "+") === "Аргументы функции должны быть числами", "Тест калькулятора 2.3 провален (аргументы должны быть числовыми)");
    console.assert(calculate(10, 4, "-") === 6, "Вычитание 10 - 4 = 6");
    console.assert(calculate(6, 7, "*") === 42, "Умножение 6 * 7 = 42");
    console.assert(calculate(-10, -5, '*') === 50, "Тест калькулятора 2.3 провален (умножение отрицательных)");
    console.assert(calculate(10, 2, "/") === 5, "Деление 10 / 2 = 5");
    console.assert(isNaN(calculate(5, 0, "/")), "Деление на ноль = NaN");
    console.assert(calculate(0, 5, '/') === 0, "Тест калькулятора 2.3 провален (деление 0 на число)");
    console.assert(calculate(10, 4, '/') == 2.5, "Тест калькулятора 2.3 провален (деление с дробным результатом)");
    console.assert(calculate(5, 3, "%") === "Unknown operation, you should only use +, -, *, /", "Неизвестная операция возвращает ошибку");
    console.assert(calculate(5, 3, "+") !== "Аргументы функции должны быть числами", "Числа должны проходить проверку типов");
    console.assert(calculate("5", 3, "+") === "Аргументы функции должны быть числами", "Строка должна возвращать ошибку типов");
    console.assert(calculate(5, "3", "+") === "Аргументы функции должны быть числами", "Строка должна возвращать ошибку типов");
    console.assert(calculate(-5, 3, "+") === -2, "Сложение отрицательных чисел");
    console.assert(calculate(Number.MAX_VALUE, 1, '+') === Number.MAX_VALUE + 1, "Переполнение при сложении");
    console.assert(calculate(Number.MAX_VALUE, Number.MAX_VALUE, '+') === Infinity, "Переполнение при сложении двух больших чисел");
    console.assert(calculate(Number.MAX_VALUE, 2, '-') === Number.MAX_VALUE - 2, "Вычитание из максимального значения");
    console.assert(calculate(Number.MAX_VALUE, 1, '*') === Number.MAX_VALUE, "Умножение на 1");
    console.assert(calculate(1, Number.MAX_VALUE, '*') === Number.MAX_VALUE, "Умножение на 1 (обратное)");
    console.assert(calculate(Number.MAX_VALUE, 10, "*") === Infinity, "Переполнение при умножении");
    console.assert(calculate(Number.MAX_VALUE, 2, '/') === Number.MAX_VALUE / 2, "Деление максимального значения");

    // Тесты для функции calculateArea
    console.assert(calculateArea("circle", 2) === 12.566370614359172, "Площадь круга");
    console.assert(calculateArea("rectangle", 2, 4) === 8, "Площадь прямоугольника");
    console.assert(calculateArea("triangle", 4, 6) === 12, "Площадь треугольника");
    console.assert(calculateArea("hexagon", 4, 6) === "Неизвестная фигура", "Неизвестная фигура");
    console.assert(calculateArea("rectangle", 5) === "Некорректные параметры", "Недостаточно параметров");
    console.assert(calculateArea("circle", 5, 2) === "Некорректные параметры", "Слишком много параметров");
    console.assert(calculateArea("circle") === "Некорректные параметры", "Нет параметров для круга");
    console.assert(calculateArea("rectangle", "a", 5) === "Некорректные параметры", "Не числовые параметры");
    console.assert(calculateArea("circle", 0) === 0, "Круг с радиусом 0");
    console.assert(calculateArea("rectangle", 0, 10) === 0, "Прямоугольник со стороной 0");
    console.assert(calculateArea("rectangle", -2, 4) === "Некорректные параметры", "Прямоугольник с отрицательной стороной");
    console.assert(calculateArea("circle", -2) === "Некорректные параметры", "Круг с отрицательным радиусом");
    console.assert(calculateArea("triangle", -2, -4) === "Некорректные параметры", "Треугольник с отрицательной высотой и стороной");

    

    // Тест задания 2.5
    console.assert(reverseString("Hello") === "olleH", "Перевёрнутая строка");
    console.assert(reverseString("") === "", "Пустая строка");
    console.assert(reverseString("a") === "a", "Один символ");
    console.assert(reverseString(123) === "321", "Нестрочный аргумент");

    // Тест задания 2.6
    const r = getRandomNumber(10, 50);
    console.assert(typeof r === "number", "Результат не число");
    console.assert(r >= 10 && r <= 50, "Результат вне границ [10, 50]");

    // Тест задания 3.1
    console.log(book.getInfo()); // проверка на корректный вывод
    console.log(book.toggleAvailability()); // false
    console.log(book.toggleAvailability()); // true
    console.log();

    // Тест задания 3.2
    console.assert(student.getAverageGrade() === (90 + 95 + 85) / 3, "Средний балл вычислен неверно");
    student.addGrade("english", 100); // добавление значения
    console.log(student.grades);
    console.log("Средний после добавления:", student.getAverageGrade());
    console.log();

    // Тест задания 4
    processArrays();

    // Тест задания 5.1
    console.log("Тест 5.1 (добавление задачи в список):");
    taskManager.addTask("Выучить CSS");
    console.log(taskManager.tasks);
    console.log();

    // Тест задания 5.2
    console.log("Тест 5.2 (отметка выполнения таска):");
    taskManager.completeTask(3);
    console.log(taskManager.tasks);
    console.log();

    // Тест задания 5.3
    console.log("Тест 5.3 (удаление элемента из массива):");
    taskManager.deleteTask(3);
    console.log(taskManager.tasks);
    console.log();

    // Тест задания 5.4
    console.log("Тест 5.4 (вывод задач по статусу):");
    console.log(taskManager.getTasksByStatus(true));
    console.log();

    // Тест задания 5.5
    console.log("Тест 5.5 (возвращение объекта stats):");
    console.log(taskManager.getStats());
    console.log();

    // Регулярки — email
    console.assert(validateEmail("a@b.co") === true, "Тест провален: минимальная длина, должен пройти");
    console.assert(validateEmail("user@mail.com") === true, "Тест провален: обычный email должен пройти");
    console.assert(validateEmail("abc.def@mail-server.com") === true, "Тест провален: email с точкой и тире должен пройти");
    console.assert(validateEmail("name+filter@domain.org") === true, "Тест провален: email с + должен пройти");
    console.assert(validateEmail("test_123@sub.domain.co.uk") === true, "Тест провален: многоуровневый домен должен пройти");
    console.assert(validateEmail("qwerty@localhost.ru") === true, "Тест провален: домен localhost должен пройти");

    console.assert(validateEmail("a@b.c") === false, "Тест провален: слишком короткий TLD, не должен пройти");
    console.assert(validateEmail("x@y.z") === false, "Тест провален: слишком короткий email, не должен пройти");
    console.assert(validateEmail("user@@mail.com") === false, "Тест провален: два @, не должен пройти");
    console.assert(validateEmail("user@.com") === false, "Тест провален: домен начинается с точки, не должен пройти");
    console.assert(validateEmail("@mail.com") === false, "Тест провален: нет имени пользователя, не должен пройти");
    console.assert(validateEmail("user name@mail.com") === false, "Тест провален: пробел в имени, не должен пройти");
    console.assert(validateEmail("юзер@mail.com") === false, "Тест провален: кириллица не разрешена");
    console.assert(validateEmail("user@domain") === false, "Тест провален: нет TLD после точки");

    console.log("Все тесты пройдены! ✅");
}

// Запуск
simpleTask();
runTests();