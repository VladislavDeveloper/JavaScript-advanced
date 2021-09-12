


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
}

const list = new GoodsList();
list.render();