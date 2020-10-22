# Mynode App

CRUD Products RESTfull API with NodeJs and MongoDb.

## Installation

1. Clone repository with <br/>
```bash
git clone https://github.com/alramdein/restful-api-nodejs-mongodb.git
```
2. On the root project, run 
```bash
npm install
```
3. Run your Mongodb server with 
```bash 
mongod
```

*The MongoDB server should be listen on `mongodb://localhost:27017/mynode`. Or you can change it on `src/config/database.config.js`. More about [getting started with MongoDB](https://www.freecodecamp.org/news/learn-mongodb-a4ce205e7739/)*

4. Still on the root project, run app with 
```bash
npm start
``` 
5. The app would served in `http://localhost:4000/`

## Usage

To test the API, I recommend using [Postman](https://www.postman.com/downloads/). 

**Routes:**
1. POST `/api/v1/products`: add a product
2. GET `/api/v1/products`: get all product
3. GET `/api/v1/products/:productId`: get product by id
4. PUT `/api/v1/products/:productId`: update product by id
4. DELETE `/api/v1/products/:productId`: delete product by id

## Contributing

I'm open for any contribution. When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

## Author

This project created by Alif Ramdani. Please kindly credit me if you want to use this project. Thanks
