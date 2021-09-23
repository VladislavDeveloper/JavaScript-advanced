
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// 1. Переделайте makeGETRequest() так, чтобы она использовала промисы.
// 2. Добавьте в соответствующие классы методы добавления товара в корзину, удаления товара из корзины и получения списка товаров корзины.
// 3* Переделайте GoodsList так, чтобы fetchGoods() возвращал промис, а render() вызывался в обработчике этого промиса.

//Перевести на промисы следующие выражение :
//  let getRequest = (url, cb) => {
//       let xhr = new XMLHttpRequest();
//       xhr.open('GET', url, true);
//       xhr.onreadystatechange = () => {
//         if (xhr.readyState === 4) {
//           if (xhr.status !== 200) {
//             console.log('Error');
//           } else {
//             cb(xhr.responseText);
//           }
//         }
//       };
//       xhr.send();
//     };

//Реализация с использованием промиса

// const gettingRequest = (url) => {
//     return new Promise((resolve, rejected) => {
//         let xhr = new XMLHttpRequest();
//         xhr.open('GET', url, true);
//         //Проверка readyState
//         xhr.onreadystatechange = () => {
//             if (xhr.readyState === 4) {
//                 if (xhr.status !== 200) {
//                     rejected('ERROR');
//                 } else {
//                     resolve(xhr.responseText);
//                 }
//             }
//         }
//         xhr.send();
//     })
// }

//Реализация с использованием универсаьлных классов
//Создаем основные классы (базовые)

//базовый класс для объекта товара
class Item {
    constructor(element, img = ('../img/no_image.jpg')) {
        this.product_name = element.product_name;
        this.price = element.price;
        this.id_product = element.id_product;
        this.img = img;
    }
    render() {
        return '';
    }
}

//Базовый класс для списка товаров
class List {
    constructor(url, container) {
        this.container = container;
        this.url = url;
        this.goods = [];
        this.allProducts = [];
        this.init()
    }
    //Метод получения данных от сервера
    getData(url) {
        return fetch(url ? url : `${API + this.url}`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    //Метод обработки полученных данных
    processData(data) {
        this.goods = data;
        this.render();
    }

    //Метод отрисовки
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            console.log(this.constructor.name);
            let productObj = null;
            if (this.constructor.name === 'ProductsList') productObj = new ProductItem(product);
            if (this.constructor.name === 'Cart') productObj = new CartItem(product);
            if (!productObj) return;

            console.log(productObj);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('afterbegin', productObj.render());
        }

    }
    init() {
        return null;
    }
}
//Далее напишем дочерние классы
//Список товаров, наследование от класса List
class ProductsList extends List {
    constructor(cart, container = '.products', url = "/catalogData.json") {
        super(url, container);
        this.cart = cart;
        this.getData()
            .then(data => this.processData(data));
    }
    init() {
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains('buy-btn')) {
                this.cart.addToCart(e.target);
            }
        });
    }
}

//Опишем наследуемый класс для карточки товаров
class ProductItem extends Item {
    render() {
        return `<div class="product-item" data-id="${this.id_product}">
            <img src="${this.img}" alt="image">
            <h3>${this.product_name}</h3>
            <p>${this.price} ₽</p>
            <p class = "description">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Nesciunt magnam soluta rem, nobis mollitia tenetur.</p>
            <button class="buy-btn"
            data-id="${this.id_product}"
            data-name="${this.product_name}"
            data-price="${this.price}">Купить</button>
        
        </div>`
    }
}

//Описываем класс корзины товаров
class Cart extends List {
    constructor(url = "/getBasket.json", container = ".cartBox") {
        super(url, container);
        this.getData()
            .then(data => {
                this.processData(data.contents);
            });
    }
    //Добавление товара
    addToCart(element) {
        this.getData(`${API}/addToBasket.json`)
            .then(data => {
                if (data.result === 1) {
                    let productId = +element.dataset['id'];
                    let find = this.allProducts.find(product => product.id_product === productId);
                    if (find) {
                        find.quantity++;
                        this.updateCart(find);
                    } else {
                        let product = {
                            id_product: productId,
                            price: +element.dataset['price'],
                            product_name: element.dataset['name'],
                            quantity: 1
                        };
                        this.goods = [product];
                        this.render();
                    }
                } else {
                    alert('Error');
                }
            })
    }
    //Удаление товара
    delFromCart(element) {
        this.getData(`${API}/deleteFromBasket.json`)
            .then(data => {
                if (data.result === 1) {
                    let productId = +element.dataset['id'];
                    let find = this.allProducts.find(product => product.id_product === productId);
                    if (find.quantity > 1) {
                        find.quantity--;
                        this.updateCart(find);
                    } else {
                        this.allProducts.splice(this.allProducts.indexOf(find), 1);
                        document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
                    }
                } else {
                    alert('Error');
                }
            })
    }
    //Обнавление корзины
    updateCart(product) {
        let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
        block.querySelector('.product-quantity').textContent = `Количество: ${product.quantity}`;
        block.querySelector('.product-price').textContent = `${product.quantity * product.price} ₽`;
    }

    init() {
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('invisible');
        });
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains('del-btn')) {
                this.delFromCart(e.target);
            }
        })
    }
}

class CartItem extends Item {
    constructor(element, img = ('../img/no_image.jpg')) {
        super(element, img);
        this.quantity = element.quantity;
    }
    render() {
        return `<div class="cart-item" data-id="${this.id_product}">
        <img src="${this.img}" alt="Image" width ="150px">
        
        
        <div class="right-block">
            <h4 class="product-title">${this.product_name}</h4>
            <h5 class="product-quantity">Количество: ${this.quantity}</h5>
            <h5 class="product-single-price">${this.price} за ед.</h5>
            <p class="product-price">${this.quantity * this.price} ₽</p>
            <button class="del-btn" data-id="${this.id_product}">Удалить</button>
        </div>
        </div>`
    }
}

new ProductsList(new Cart);