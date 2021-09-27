Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            filtered: [],
            imgCatalog: 'https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg',
        }
    },
    methods: {
        filter(data) {
            let regexp = new RegExp(data, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted() {
        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: `<div class='product-box'>
                <product v-for='item of filtered' :key='item.id_product' :img='imgCatalog' :product='item'></product>
    </div>
    `
});

Vue.component('product', {
    props: ['product', 'img'],
    template: `
        <div class='product-item'>
            <img :src='img' alt='no image' width='200px'>
            <h3>{{product.product_name}}</h3>
            <p>{{product.price}} руб</p>
            <button class='buy-btn' v-on:click='$root.$refs.cart.addProduct(product)'>Купить</button>
        </div>
    `
})