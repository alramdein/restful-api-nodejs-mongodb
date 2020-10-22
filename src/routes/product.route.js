import * as product from '../controller/product.controller' ;

const productRoutes = (app) => {
    // products
    app.post('/api/v1/products', product.addProduct);   
    app.get('/api/v1/products', product.getAllProduct);  
    app.get('/api/v1/products/:productId', product.getProductById);  
    app.put('/api/v1/products/:productId', product.updateProduct); 
    app.delete('/api/v1/products/:productId', product.deleteProduct);  
}

export default productRoutes;