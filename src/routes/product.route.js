import * as product from '../controller/product.controller' ;
import { isAuthenticatedMiddleware } from '../auth/jwt.authentication';

const productRoutes = (app) => {
    app.post('/api/v1/products', isAuthenticatedMiddleware, product.addProduct);   
    app.get('/api/v1/products', isAuthenticatedMiddleware, product.getAllProduct);  
    app.get('/api/v1/products/:productId', isAuthenticatedMiddleware, product.getProductById);  
    app.put('/api/v1/products/:productId', isAuthenticatedMiddleware, product.updateProduct); 
    app.delete('/api/v1/products/:productId', isAuthenticatedMiddleware,product.deleteProduct);  
}

export default productRoutes;