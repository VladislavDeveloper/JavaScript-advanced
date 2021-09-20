// 3. *Создать форму обратной связи с полями: Имя, Телефон, E-mail, текст, кнопка Отправить. При нажатии на кнопку Отправить произвести валидацию полей следующим образом:
// a. Имя содержит только буквы.
// b. Телефон имеет вид +7(000)000-0000.
// c. E-mail имеет вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.
// d. Текст произвольный.
// e. Если одно из полей не прошло валидацию, необходимо выделить это поле красной рамкой и сообщить пользователю об ошибке.

//Назначим переменные для инициализации инпутов

d = document;

let form = d.forms.regform;
let nameError = d.querySelector('.nameError');
let mailError = d.querySelector('.mailError');
let telError = d.querySelector('.telError');


let subBtn = document.querySelector('.submit').addEventListener('click', formValidation);


//Функция валидации формы
function formValidation(e) {
    e.preventDefault();

    let name = form.elements.name;
    let mail = form.elements.email;
    let telephone = form.elements.telephone;

    let result = true;

    if (nameValid(name) == false) {

        result = false;
    }

    if (mailValid(mail) == false) {
        result = false;
    }

    if (telValid(telephone) == false) {
        result = false;
    }

    if (result == false) {
        document.getElementById('inputResult').innerText = "Некорректные данные\nПовторите попытку"
    }
    if (result == true) {
        document.getElementById('inputResult').innerText = "Спасибо! Данные отправлены"
    }

    return result;
};





//Функция проверки поля "имя"
function nameValid(name) {
    //Регулярное выражение для проверки допустимых значений поля

    let nameCheck = /^[A-Za-zА-Яа-я ]+$/;

    if (name.value == '') {
        nameError.innerText = 'Заполните поле !';
        name.classList.add("inputError");
        return false;
    }
    if (name.value.match(nameCheck)) {
        return true;
        if (classList.contains("inputError")) {

        }
    }
    else {
        nameError.innerText = 'Имя может содержать только буквы и пробел';
        name.classList.add("inputError");
        return false;
    }
}


//Функция проверки поля email
function mailValid(mail) {
    //Регулярное выражение для проверки почты
    let mailCheck = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/;

    if (mail.value == '') {
        mailError.innerText = 'Заполните поле !';
        mail.classList.add("inputError");
        return false;
    }
    if (mail.value.match(mailCheck)) {
        return true;
    }
    else {
        mailError.innerText = 'Адрес эл. почты может содержать только латинские буквы а также символы @ , . - _';
        mail.classList.add("inputError");
        return false;
    }

}


//Проверка номера телефона
function telValid(telNumber) {

    //Регулярное выражение для проверки телефона
    let numberCheck = /^\+\d{1}\(\d{3}\)\d{3}-\d{4}$/;

    if (telNumber.value == '' || telNumber == '+7(000)000-00-00') {
        telNumber.classList.add("inputError");
        telError.innerText = 'Заполните поле !';

    }
    if (telNumber.value.match(numberCheck)) {
        return true;
    }
    else {
        telError.innerText = 'Телефон введите в формате +7(000)000-0000';
        telNumber.classList.add("inputError");
        console.log(false);
    }
}

