[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/alramdein/restful-api-nodejs-mongodb.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/alramdein/restful-api-nodejs-mongodb/context:javascript)
[![Maintainability](https://api.codeclimate.com/v1/badges/cd9567d43c95cad5bfda/maintainability)](https://codeclimate.com/github/alramdein/restful-api-nodejs-mongodb/maintainability)
![Repo size](https://img.shields.io/github/repo-size/alramdein/restful-api-nodejs-mongodb)

# Mynode App

CRUD application RESTful API with JWT user authentication. Created with NodeJs and MongoDb.
> **DISCLAIMER:**</span> *User authentication in this project is just for educational/practice purposes only. Using JWT in production is not recommended because there are a lot of implementation risks of rolling your own authentication solution. Instead use third-party authentication.* [Learn more.](https://dzone.com/articles/user-authentication-best-practices-checklist)


## Installation

1. Clone repository with <br/>
```bash
git clone https://github.com/alramdein/restful-api-nodejs-mongodb.git
```
2. On the root project, run 
```bash
npm install
```
3. Run your MongoDB server with 
```bash 
mongod
```

*The MongoDB server should be listening on `mongodb://localhost:27017/mynode`. Or you can change it on `src/config/database.config.js`. More about [getting started with MongoDB](https://www.freecodecamp.org/news/learn-mongodb-a4ce205e7739/)*

4. Still on the root project, run the app with 
```bash
npm start
``` 
5. The app would be served in `http://localhost:4000/`

## Usage

To test the API, I recommend using [Postman](https://www.postman.com/downloads/).

If users don't exist yet, create it with endpoint

``` bash
POST /api/v1/users 
```

by sending `username` and `password` in the `body request`.

Then, login with endpoint

``` bash
POST /login 
```

by sending `username` and `password` in the `body request`. 

After that, you will get an `Access Token` from the response. Use it to access all the endpoint by
set `Access-Token` in the `request header`.

```bash
"Access-Token": <Random access token>
```

**Routes:**
1. POST `/login`: user login
2. GET `/`: welcome message
3. POST `/api/v1/users`: add a user
4. GET `/api/v1/users`: get all user
5. GET `/api/v1/users/:username`: get user by username
6. PUT `/api/v1/users/:username`: update user by username
7. DELETE `/api/v1/users/:username`: delete user by username
8. POST `/api/v1/products`: add a product
9. GET `/api/v1/products`: get all product
10. GET `/api/v1/products/:productId`: get product by id
11. PUT `/api/v1/products/:productId`: update product by id
12. DELETE `/api/v1/products/:productId`: delete product by id


> **Note**: `/logout` endpoint is not provided because it should be handled on the client-side by destroying the `Access Token`


## Contributing

I'm open to any contribution. When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

## Author

This project was created by Alif Ramdani. Please kindly credit me if you want to use this project. Thanks
