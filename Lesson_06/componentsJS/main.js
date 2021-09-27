// 1. Вынести поиск в отдельный компонент.
// 2. Вынести корзину в отдельный компонент.
// 3. *Создать компонент с сообщением об ошибке. Компонент должен отображаться, когда не удаётся выполнить запрос к серверу.

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
new Vue({
    el: '#app',
    data: {
        isError: false,
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log('Ошибка, данные не получены');
                    this.isError = true;
                })
        },
    },
})