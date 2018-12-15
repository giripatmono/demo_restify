# Demo Simple Product API with Restify & MongoDB

### MongoDB
This demo assumes MongoDB is installed and running on port 27017.
To check if MongoDB is installed, run this command on terminal.
```
$ mongo

MongoDB shell version v3.4.7
connecting to: mongodb://127.0.0.1:27017
MongoDB server version: 3.4.7
```

### Start
First install dependencies in `package.json` by running npm install in the api directory.
Then run npm start.

`$ cd api`

`$ npm install`

`$ npm start`

## REST API

#### Authentication
The Authentication uses a simple `Basic Authentication Header` using username and password.

Example sending request with authentidation header using curl:
```
curl -i -X GET "http://localhost:3000/products" -H "Content-Type: application/json" --user demo:demo123
```

#### Resource Endpoint

##### 1. Create Product
- method : `POST`
- endpoint : `/products`
- parameters:
  - name : String
  - description : String
  - category : String
  - price : Number
  - size : String
  - color : String
- request example:
  - `$ curl -i -X POST "http://localhost:3000/products" -H "Content-Type: application/json" 
     -d '{"name" : "Product1", "description": "Description1", price:10000}' --user demo:demo123`
- response example:
  - status : `201 Created`
  
##### 2. List Product
- method : `GET`
- endpoint : `/products`
- request example:
  - `$ curl -i -X GET "http://localhost:3000/products" -H "Content-Type: application/json" --user demo:demo123`
- response example:
  - status : `200 OK`
  - body :
  ```
  [
    {
        "_id": "5c14c2230b8eb86c6a424835",
        "name": "Product 1",
        "description": "Description 1",
        "price": 10000,
        "updatedAt": "2018-12-15T08:58:11.301Z",
        "createdAt": "2018-12-15T08:58:11.301Z",
        "__v": 0
    }
  ]
  ```

##### 3. Update Product
- method : `PUT`
- endpoint : `/products/:product_id`
- parameters:
  - name : String
  - description : String
  - category : String
  - price : Number
  - size : String
  - color : String
- request example:
  - `$ curl -i -X PUT "http://localhost:3000/products/5c14c2230b8eb86c6a424835" -H "Content-Type: application/json" 
     -d '{"size" : "small", "color" : "blue"}'`
- response example:
  - status : `200 OK`
  - body :
  ```
  {
    "size": "small",
    "color": "blue",
    "_id": "5c14c2230b8eb86c6a424835"
  }
  ```
  
##### 4. Delete Product
- method : `DELETE`
- endpoint : `/products/:product_id`
- request example:
  - `$ curl -i -X DELETE "http://localhost:3000/products/5c14c2230b8eb86c6a424835" -H "Content-Type: application/json"`
- response example:
  - status : `204 No Content`
  
  
##### 5. Filter Product by size, color, & price range (Case study)
- method : `GET`
- endpoint : `/products`
- filter parameters:
  - size : String
  - color : String
  - price : Number
- request example:
  - `$ curl -i -X GET "http://localhost:3000/products?size=small&color=blue&price={gte}6000{lte}10000" -H "Content-Type: application/json"`
- response example:
  - status : `200 OK`
  - body :
  ```
  [
    {
        "_id": "5c14c2230b8eb86c6a424835",
        "name": "Product 1",
        "description": "Description 1",
        "price": 6000,
        "size": "small",
        "color": "blue",
        "updatedAt": "2018-12-15T08:58:11.301Z",
        "createdAt": "2018-12-15T08:58:11.301Z",
        "__v": 0
    },
    {
        "_id": "5c14c2230b8eb86c6a424835",
        "name": "Product 2",
        "description": "Description 2",
        "price": 10000,
        "size": "small",
        "color": "blue",
        "updatedAt": "2018-12-15T08:58:11.301Z",
        "createdAt": "2018-12-15T08:58:11.301Z",
        "__v": 0
    }
  ]
  ```