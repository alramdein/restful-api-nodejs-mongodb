import * as user from '../controller/user.controller' ;

const userRoutes = (app) => {
    //users
    app.post('/api/v1/users', user.addUser); 
}

export default userRoutes;