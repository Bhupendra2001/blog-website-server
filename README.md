#  Project - blog-website



# About

This project is basis of `Blog Website`. I am created the two Schema of  project first  is user and second is posts.
In this project basically i am created the user register and login page for the purpose of the authentication and authorisation.
After login user can create blog , get blog, and delete blog. Differnt type of blogs present in website , also user can filter the blogs by the given categories.


# Statement

-    Create the user & posts APIs.
-    Test the all  the APIs.
-    create the frontend or backend by the help of  Tech Stack `NodeJS , MongoDB, Javascript, ReactJS, Express, HTML , CSS`.
-    After created  both  the Technologies connect to each others or run on the server.
-    Used the MongoDB database for storing the data of user and post.


##  USER APIs

>POST  `/api/auth/register`

- Create the user register api and given in body username , email & password.
- Before create the user details check email is unique or not 
- Create a user - atleast 5 users
- Return HTTP status 201 on a succesful user creation. Also return the user document. The response should be a JSON object like [this](#Successfull-Register-Response-Structure)
- Return HTTP status 400 if no params or invalid params received in request body. The response should be a JSON object like [this](#Error-Response-structure)


>POST  `/api/auth/login`

- Allow an user to login with their email and password.
- On a successful login attempt return a JWT token contatining the userId, . The response should be a JSON object like [this](#Successfull-Login-Response-Structure)
- If the credentials are incorrect return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#Error-Response-structure)


>POST `/api/auth/logout`

- Allow an user to logout the website and provide the login option.
- On a successful logout  return message, . The response should be a JSON object like [this](#Successfull-Logout-Response-Structure)
- If the credentials are incorrect return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#Error-Response-structure)
## Blog APIs

>POST `/api/posts`

- Create the blog post. Given in request body title , description , categories , date , image.
- Create a blog - atleast 10 blogs
- Only Authenticated User allowed to create blog.
- Return HTTP status 201 on a succesful blog creation. Also return the blog document. The response should be a JSON object like this
- Return HTTP status 400 if no params or invalid params received in request body. The response should be a JSON object like [this](#Error-Response-structure)

>GET  `/api/posts`

- Get the all blogs by this APis. If any query in url so given blog according to the query.
- This posts show all user which are login or not login.
- On a successful get blog data  return blogs data. The response should be a JSON object like this
- If the credentials are incorrect return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#Error-Response-structure)

>GET `/api/posts/:blogId`

- Get blog by blogId Only Authenticated User allowed to see this.
- On a successful get blog data  return blogs data. The response should be a JSON object like this
- If the credentials are incorrect return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#Error-Response-structure)

>Patch `/api/posts/:blogId/:userId`

- Update blog by given blogId. Only Authorised User allowed to update blog.
- On a successful Update blog data  return updated blogs data. The response should be a JSON object like this
- If the credentials are incorrect return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#Error-Response-structure)

>DELETE  `/api/posts/:blogId/:userId` 

- Delete the blog by given blogId.Only Authorised User allowed to Delete blog.
- On a successful Delete blog   return proper message. The response should be a JSON object like this
- If the credentials are incorrect return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#Error-Response-structure)

### Error Response structure
```yaml
{
  status: false,
  message: ""
}
```

### Successfull Register Response Structure

```yaml
{
  "message" : "successfully register" ,
  "data" : {
  "_id": "644b9dc00930cdf2bb51e00d" ,
  "username": "bhupendra namdev",
  "email": "bnamdev20@gmail.com",
  "password": "$2a$10$pHUylLCg4QXieaIK67tREexKYjrhawW6m56qcRDBPIMGqKYKsypE2",
  "createdAt": "2023-04-28T10:19:44.155Z",
  "updatedAt": "2023-04-28T10:19:44.155Z" ,
  "__v": 0
}
  
}
```
### Successfull Login Response Structure

```yaml
{
  "username": "bhupendra namdev",
  "email": "bnamdev20@gmail.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDRiOWRjMDA5MzBjZGYyYmI1MWUwMGQiLCJpYXQiOjE2ODM5NTQxODV9.35oKM6zgtD2TfUqxfDqmMZeZ1ttZ2OcpZGlJDQMClo8",
  "_id": "644b9dc00930cdf2bb51e00d"
}
```

### Successfull Logout Response Structure

```yaml {
"message" : "User has been logged out"
}
```



