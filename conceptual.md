### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
  
  **We can use either Promise or Async/Await.**

- What is a Promise?

  **Promise is a way to handle asynchonous tasks in Javascript. When we invoke a promise function, what return to us is a pending promise. We can catch the result of that promise by calling its method .then(), and .catch() to catch errors thrown by that promise.** 

- What are the differences between an async function and a regular function?

  **By invoking a regular function, our execution flow will jump right into the inside of that function. And we will get the result of whatever that function return when it reaches the end immediately.**

  **Otherwise, by calling an async function, we will get a pending promise which means Javascript will execute that function in the future. To get the result of that function, we either use *await* or treat it as pending promise.**

- What is the difference between Node.js and Express.js?

  **Node.js is an execution enviroment to run Javascript code. It provides us libraries/APIs to interact with underling system such as FileSystem, Networking, etc**

  **Express.js is a framework to build backend applications in NodeJS. It gives us more abstract way to deal with http requests and responses. Provide us routing and middleware concept to helps breaking down our application into more manageable pieces.**

- What is the error-first callback pattern?

  **Error-first callback pattern is used by NodeJS built-in libraries as a way to return the result to its API consumers. The callback interface includes two arguments: 1st is Error and 2nd is Result**

  **If the 1st arg of the callback is other than NULL, it means there is an error occur**

  **Otherwise, the 2nd arg will contain the success result**

- What is middleware?

  **Middleware is a pattern that ExpressJS introduce so that we can intercept the workflow of hanlding HTTP requests and responses.**

- What does the `next` function do?

  **By calling `next` function, we allow lower-order middlewares in chain to execute to handle requests/manipulate responses.**

  **If the current middleware does not end the request-response cycle, it must call `next()` to pass the control to the next middleware**

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```

  1. Repeat itself: We can extract the HTTP request call to a more meaningful function 

```js
async function fetchUser(userName) {
 //...
}
```

  1. Performace: Above code calling  method `$.getJSON` and `await` them in sequence which could make the task take longer to complete. Instead, we can make all 3 requests simultaneously by invoking them without `await` keyword and use `Promise.all` to wait for all 3 requests to complete.

```js
const users = await Promise.all([fetchUser("elie"), fetchUser("joelburton"), fetchUser("matt")])
```