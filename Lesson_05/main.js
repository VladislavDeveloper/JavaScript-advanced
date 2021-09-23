// 1. Добавить методы и обработчики событий для поля поиска. Создать в объекте данных поле searchLine и привязать к нему содержимое поля ввода. На кнопку «Искать» добавить обработчик клика, вызывающий метод FilterGoods.
// 2. Добавить корзину. В html-шаблон добавить разметку корзины. Добавить в объект данных поле isVisibleCart, управляющее видимостью корзины.
// 3. *Добавлять в .goods-list заглушку с текстом «Нет данных» в случае, если список товаров пуст.



const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data:{
        //Данные для списка товаров
        catalogUrl: '/catalogData.json',
        products: [],
        imgCatalog: 'img/no_image.jpg',
        //Данные для корзины
        basketUrl:'/getBasket.json',
        productsInBasket: [],
        basketImage: 'img/no_image.jpg',
        //Отображение корзины
        showBasket: false,
        //поиск по странице
        userSearch:'',
        filteredItems:[],
    },
    methods:{

        //Метод для поиска товаров
        search(){
            let filter = new RegExp(this.userSearch, 'i');
            this.filteredItems = this.productsInBasket.filter(el => filter.test(el.product_name));
        },
        
        //Метод для получения данных для каталога
        getData(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })   
        },
        //Метод для добавления товара в корзину
        addProduct(product){
            this.getData(`${API}/addToBasket.json`)
            .then( data => {
                if(data.result == 1){
                    let item = this.productsInBasket.find(el => 
                        el.id_product === product.id_product);
                    if(item){
                        item.quantity++;
                    }
                    else{
                        let prod = Object.assign({quantity: 1}, product);
                        this.productsInBasket.push(prod);
                    }
                }
                else{
                    console.log(`Ошибка !`);
                }
            })
        },
        //Метод для удаления товара из корзины
        deleteItem(item){
            this.getData(`${API}/deleteFromBasket.json`)
                .then(data => {
                if (data.result === 1) {
                    if (item.quantity > 1) {
                    item.quantity--;
                    } else {
                    this.productsInBasket.splice(this.productsInBasket.indexOf(item), 1)
                    }
                }
            })

        }

        
    },
    created(){
        this.getData(`${API + this.basketUrl}`)
        .then(data => {
            for(let el of data.contents){
                this.productsInBasket.push(el);
            }
        })
        this.getData(`${API + this.catalogUrl}`)
        .then(data => {
            for(let el of data){
                this.products.push(el);
                this.filteredItems.push(el);
            }
        });
    }

})