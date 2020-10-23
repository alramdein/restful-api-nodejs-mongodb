import * as user from '../controller/user.controller' ;
import { isAuthenticatedMiddleware } from '../auth/jwt.authentication';

const userRoutes = (app) => {
    app.post('/api/v1/users', user.addUser);
    app.get('/api/v1/users', isAuthenticatedMiddleware, user.getAllUser);  
    app.get('/api/v1/users/:username', isAuthenticatedMiddleware, user.getUserByUsername);
    app.put('/api/v1/users/:username', isAuthenticatedMiddleware, user.updateUser);
    app.delete('/api/v1/users/:username', isAuthenticatedMiddleware, user.deleteUser);           
};

export default userRoutes;