import * as product from '../controller/product.controller' ;

const productRoutes = (app) => {
    app.post('/api/v1/products', product.addProduct);   
    app.get('/api/v1/products', product.getAllProduct);  
}

export default productRoutes;