//1. Добавьте пустые классы для корзины товаров и элемента корзины товаров. Продумайте, какие методы понадобятся для работы с этими сущностями.
//2. Добавьте для GoodsList метод, определяющий суммарную стоимость всех товаров.


//Класс для карточки товара
class GoodsItem {
    constructor(title, price, id, image) {
        this.title = title;
        this.price = price;
        this.id = id;
        this.img = image;
    }
    //Метод отрисовки товара
    render() {
        return `<div class="product-item" data-id = "${this.id}">
                    <img src="${this.img}" alt="product image">
                    <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price}</p>
                    <button class="by-btn">Купить</button>
                    </div>
                </div>`
    }
}

//Класс для списка товаров
class GoodsList {
    constructor() {
        // this.container = container;
        this.goods = [
            { id: 1, image: './img/notebook.jpg', title: 'Notebook', price: 1000 },
            { id: 2, image: './img/mouse.jpg', title: 'Mouse', price: 100 },
            { id: 3, image: './img/keyboard.jpg', title: 'Keyboard', price: 250 },
            { id: 4, image: './img/gamepad.jpeg', title: 'Gamepad', price: 150 },
        ];

    }
    //Метод для отрисовки списка товаров
    render() {
        let list = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price, good.id, good.image);
            list += goodItem.render();
        })
        document.querySelector('.products').innerHTML = list;
    }
    //Метод для подсчета суммарной суммы всех товаров
    totalGoodsPrice() {
        let sum = 0;
        this.goods.forEach(good => {
            sum += good.price;
        })
        console.log(sum);
    }
}


//Класс для корзины товаров
class Cart {
    constructor() {
        this.goodsInCart = [];
        this.goods = [
            { id: 1, image: './img/notebook.jpg', title: 'Notebook', price: 1000 },
            { id: 2, image: './img/mouse.jpg', title: 'Mouse', price: 100 },
            { id: 3, image: './img/keyboard.jpg', title: 'Keyboard', price: 250 },
            { id: 4, image: './img/gamepad.jpeg', title: 'Gamepad', price: 150 },
        ]
    }
    //Метод для добавления товара в корзину
    addToCart() {
        this.goodsInCart.push(this.goods[1], this.goods[3]);//добавили условно два элемента в корзину mouse и gamepad
        console.log(this.goodsInCart);
    }
    //Метод для удаления товара из корзины
    deleteCartItem() {
        this.goodsInCart.splice(0, 1);
        console.log(this.goodsInCart);
    }
    //Метод для подсчета итоговой суммы товаров, добавленных пользователем в корзину
    totalCartPrice() {
        let sum = 0;
        this.goodsInCart.forEach(good => {
            sum += good.price
        })
        console.log(sum);
    }
    //Метод для отрисовки товаров в корзине
    render() {
        const cartBox = document.querySelector('.productBox');
        for (let product of this.goodsInCart) {
            const cartObj = new ProductInCart(product);
            cartBox.insertAdjacentHTML('beforeend', cartObj.render());
        }
    }
}

//Класс карточки товара для корзины
class ProductInCart {
    constructor(product) {
        this.title = product.title;
        this.price = product.price;
    }
    render() {
        return `<h4>${this.title} ${this.price}</h4>`;
    }
}

//Функция для отрисовки и отображения корзины в браузере
showCart = () => {
    display = document.querySelector('.cart')
    cart.render();
    display.style.display = 'block';
}

const list = new GoodsList();
list.render();
list.totalGoodsPrice(); //Проверка работоспособности метода totalGoodsPrice, результат будет выведен в консоль

const cart = new Cart();
cart.addToCart();//Проверка симуляции добовления товара в корзину, вывод в консоль элементов массива goodsInCart
cart.deleteCartItem();//Проверка метода удаление товара из корзины
cart.totalCartPrice();//Проверка подсчета итоговой суммы корзины
const cartBtn = document.querySelector('.btn-cart').addEventListener('click', showCart);//Для проверки отрисовки корзины нв браузере необъодимо кликнуть по кнопке "корзина"
