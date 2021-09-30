Vue.component('server-error', {
    template: `
        <div class='error-message' v-if='$root.isError'><h4>Ошибка сервера: данные не получены Код ошибки: 404</h4></div>`
})