const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data:{
        catalogUrl: '/catalogData.json',
        products: [],
        imgCatalog: 'img/no_image.jpg'
    },
    methods:{
        getData(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })   
        },
        addProduct(good){
            console.log(good);
        }

        
    },
    created(){
        this.getData(`${API + this.catalogUrl}`)
        .then(data => {
            for(let el of data){
                this.products.push(el);
            }
        });
    }

})