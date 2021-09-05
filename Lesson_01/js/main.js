
//1. Добавьте стили для верхнего меню, товара, списка товаров и кнопки вызова корзины.
//2. Добавьте значения по умолчанию для аргументов функции. Как можно упростить или сократить запись функций?
//3. *Сейчас после каждого товара на странице выводится запятая. Из-за чего это происходит? Как это исправить?





const products = [
    {id: 1, image: '<img src = "./img/notebook.jpg">', title: 'Notebook', price: 1000},
    {id: 2, image: '<img src = "./img/mouse.jpg">', title: 'Mouse', price: 100},
    {id: 3, image: '<img src = "./img/keyboard.jpg">', title: 'Keyboard', price: 250},
    {id: 4, image: '<img src = "./img/gamepad.jpeg">', title: 'Gamepad', price: 150},
  ];
  
  
  
  const renderProduct = (image, title, price) => {
    return `<div class="product-item">${image}<h3>${title}</h3><p>${price}</p><button class="by-btn">Добавить</button></div>`;
  };
  
  const renderProducts = list =>{
    document.querySelector('.products').insertAdjacentHTML('beforeend', list.map(item => renderProduct(item.image, item.title, item.price)).join(''));
  }
  
  renderProducts(products);




  