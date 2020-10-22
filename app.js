import express, { json, urlencoded } from 'express';
import mongoose from 'mongoose';
import { dbUrl } from './src/config/database.config';
import productRoutes from './src/routes/product.route';
import userRoutes from './src/routes/user.route';

const PORT = 4000;

const app = express();

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));

// Parse requests of content-type - application/json
app.use(json());

// Confirgure the database
mongoose.Promise = global.Promise;
mongoose.connect(dbUrl, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to database");
}).catch(err => {
    console.log(`Could not connect to database. Exiting now... ${err}`);
    process.exit();
})

app.get('/', (req, res) => {
    res.json({"message": "Welcome to Mynode application."});
});

// other api routes 
productRoutes(app);
userRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})