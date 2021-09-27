Vue.component('search', {
    data() {
        return {
            userSearch: '',
        }
    },
    template: `
        <div>
            <form action="#" class="search-form">
                <input type="text" class="search-field" v-model="userSearch">
                <button class="btn-search" @click='$root.$refs.products.filter(userSearch)'>Поиск</button>
            </form>
        </div>
    `
})