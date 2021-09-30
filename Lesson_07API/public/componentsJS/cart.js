Vue.component('cart', {
    data() {
        return {
            imgCart: 'https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg',
            cartItems: [],
            isVisibleCart: false,
        }
    },
    methods: {
        addProduct(product) {
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, { quantity: 1 });
                find.quantity++;
            } else {
                let prod = Object.assign({ quantity: 1 }, product);
                this.$parent.postJson('/api/cart', prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod);
                        }
                    });
            }
        },
        remove(item) {
            if (item.quantity > 1) {
                this.$parent.putJson(`/api/cart/${item.id_product}`, { quantity: -1 })
                    .then(data => {
                        if (data.result === 1) {
                            item.quantity--;
                        }
                    });
            } else {
                this.$parent.deleteJson(`/api/cart/${item.id_product}`)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    });
            }
        },
    },
    mounted() {
        this.$parent.getJson('/api/cart')
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                }
            });
    },
    template: `
            <div class='cart-block'>
                <button class='btn-cart' v-on:click='isVisibleCart = !isVisibleCart'>Корзина</button>
                <div class='cart-item-box' v-show='isVisibleCart'>
                    <h3 v-if='!cartItems.length'>Ваша корзина грустит, в ней пока нет товаров :(</h3>
                    <cart-item v-for='item of cartItems' :key='item.id_product' :cart-item='item' :img='imgCart' @remove='remove'>
                    </cart-item>
                </div>
            </div>
    `
});
Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `
        <div class='cart-item'>
            <img :src='img' alt='no image' width='100px'>
            <h4>{{cartItem.product_name}}</h4>    
            <p>Кол-во: {{cartItem.quantity}}</p>    
            <h4>{{cartItem.price}} за ед.</h4>
            <p>{{cartItem.quantity*cartItem.price}}</p>
            <button class='del-btn' v-on:click="$emit('remove', cartItem)">Удалить</button>    
        </div>
    `
})