import express, { json, urlencoded } from 'express';
import mongoose from 'mongoose';
import '@babel/core';
import '@babel/polyfill';
import { dbUrl } from './src/config/database.config';
import productRoutes from './src/routes/product.route';
import userRoutes from './src/routes/user.route';
import { 
    jwtAuthenticationMiddleware, 
    isAuthenticatedMiddleware, 
    jwtLogin 
} from './src/auth/jwt.authentication';

const PORT = 4000;

const app = express();

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));

// Parse requests of content-type - application/json
app.use(json());

// Authenticate every user request
app.use(jwtAuthenticationMiddleware);

// Confirgure the database
mongoose.Promise = global.Promise;
mongoose.connect(dbUrl, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to database");
}).catch(err => {
    console.log(`Could not connect to database. Exiting now... ${err}`);
    process.exit();
});

app.post('/login', jwtLogin );
app.get('/', isAuthenticatedMiddleware, (req, res) => {
    res.json({"message": "Welcome to Mynode application."});
});

// other api routes 
productRoutes(app);
userRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});