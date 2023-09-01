![RESYANA CAHYANITA](https://github.com/RevoU-FSSE-2/week-11-resyanac/assets/135514670/7db19066-50c9-4416-9419-a06e8048ea4e)


## INTRODUCTION

Hello, Resya here! 23 years old girl in +8 GMT (East Borneo) timezone. I am a Tax Collector and software engineer.

RESTful API for Transfer Request Management

This 11th week milestone projectt, i make a RESTful API built with Node.js, Express.js, MongoDB Atlas, and Swagger. It facilitates the interaction between two distinct roles: the "reviewer" and the "approver." The primary goal of this API is to manage reviewer to give the movie review and the approver to give the approval. Why i need approver to approve the movie review, because a lot of movie reviewer give review in impolite ways.

## Features

CRUD Operations: The API supports Create, Read, Update, and Delete (CRUD) operations for two distinct collections: Users and Transfers.

Role-Based Access: Users are categorized into "reviewer" and "approver" roles, each with specific permissions and access levels.

Swagger Documentation: Comprehensive API documentation is available via Swagger UI, making it easy for developers to understand and interact with the API.

MongoDB Atlas Integration: Data is stored in MongoDB Atlas, providing scalability, reliability, and ease of management.

## Usage

Access the API documentation and test the endpoints using Swagger UI at [Production](https://weak-blue-cow-hose.cyclic.app/) and [Swagger UI](https://weak-blue-cow-hose.cyclic.app/api-docs/#/).

## API Endpoints

### Users


- `GET /`: homepage.
- `GET /user/allusers`: Retrieve all users.
- `POST /user/register`: Register a new user.
- `POST /user/login`: Login a new user.

### Review

- `GET /review/`: Retrieve all review requests.
- `POST /review/`: Create a new movie review.
- `PUT /review/:id`: Update an existing all movie review by ID.
- `PATCH /review/:id`: Update an existing movie review by ID.
- `DELETE /review/:id`: Delete a movie review by ID.


![Screen Shot 2023-09-01 at 18 22 29](https://github.com/RevoU-FSSE-2/week-11-resyanac/assets/135514670/b7792712-2064-4949-a013-d39bbbcfa4fc)

![Screen Shot 2023-09-01 at 16 15 03](https://github.com/RevoU-FSSE-2/week-11-resyanac/assets/135514670/f1835a60-0d71-40fc-97f2-0dc9ffa975f4)




