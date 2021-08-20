const express = require("express");
require('dotenv').config();
const cors = require('cors')


const logger = require("./config/winstonlog");
const HttpError=require("./app/models/http-error")
const users=require("./app/routes/user.routes")

// create express app
const app = express();

//Port variable
const port=process.env.PORT||8080

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// parse requests of content-type - application/json
app.use(express.json({ limit: "50mb", extended: true }));
app.use(cors());

app.options('*', cors())


app.use("/api/users",users)


// define a simple  to  test the project
app.get("/", (req, res) => {
  res.json({ message: "Project is running" }); 
});


app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});




app.use((error, req, res, next) => {  
  res.status(error.code || 500);
  res.json({ 
    message: error.message || 'An unknown error occurred in the server!',
    stack:error.stack
  });
});


// listen for requests
app.listen(port, async() => {
  logger.info("Successfully connected to the database",{reqdetails:"Server"}) 
  console.log(`Server is listening on port ${port}`); 
});


