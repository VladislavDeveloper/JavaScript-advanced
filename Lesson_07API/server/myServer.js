const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use('/', express.static('public'));


//Products endpoint
app.get('/api/products', (req, res) => {
    fs.readFile('./server/db/products.json', 'utf-8', (error, data) => {
        if (error) res.send({ result: 0, text: error });
        else res.send(data);
    })
});
//Cart endpoints
app.get('/api/cart', (req, res) => {
    fs.readFile('./server/db/userCart.json', 'utf-8', (error, data) => {
        if (error) res.send({ result: 0, text: error });
        else res.send(data);
    })
});
//Add to cart
app.post('/api/cart', (req, res) => {
    fs.readFile('./server/db/userCart.json', 'utf-8', (error, data) => {
        if (error) res.send({ result: 0, text: error });
        else {
            const cart = JSON.parse(data);
            cart.contents.push(req.body);

            fs.writeFile('./server/db/userCart.json', JSON.stringify(cart), (error) => {
                if (error) res.send({ result: 0, text: error });
                else res.send({ result: 1 });
            });
        }
    })
});

//Update cart
app.put('/api/cart/:id', (req, res) => {
    fs.readFile('./server/db/userCart.json', 'utf-8', (error, data) => {
        if (error) res.send({ result: 0, text: error });
        else {
            const cart = JSON.parse(data);
            const find = cart.contents.find((good) => {
                return good.id_product === +req.params.id
            });

            find.quantity++;

            fs.writeFile('./server/db/userCart.json', JSON.stringify(cart), (error) => {
                if (error) res.send({ result: 0, text: error });
                else res.send({ result: 1 });
            });
        }
    })
});
//Remove product
app.delete('/api/cart/:id', (req, res) => {
    fs.readFile('./server/db/userCart.json', 'utf-8', (error, data) => {
        if (error) res.send({ result: 0, text: error });
        else {
            const cart = JSON.parse(data);
            const find = cart.contents.find((good) => {
                return good.id_product === +req.params.id
            });
            cart.contents.splice(cart.contents.indexOf(find), 1);

            fs.writeFile('./server/db/userCart.json', JSON.stringify(cart), (error) => {
                if (error) res.send({ result: 0, text: error });
                else res.send({ result: 1 });
            });
        }
    })
});

const port = 5555;

app.listen(port, () => {
    console.log(`server started at port ${port}`);
});

module.exports = {

}
