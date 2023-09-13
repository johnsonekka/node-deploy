const express = require("express");
const morgan = require("morgan");
const server = express();
const productRouter = require('./routes/product');
const userRouter = require('./routes/users');

// bodyParser
server.use(express.json());
server.use(morgan("default"));
server.use(express.static("public"));
server.use('/products',productRouter.router);
server.use('/users',userRouter.router);

// MVC model-view-controller

server.listen(8080, () => {
  console.log("server started");
});
