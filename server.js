//importing modules
const express = require("express");
const sequelize = require("sequelize");
const cors = require("cors");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const db = require("./src/models");
const userRoutes = require("./src/routes/authRoute");
const productRoutes = require("./src/routes/productRoute");

//setting up your port
const PORT = process.env.PORT || 8080;

//assigning the variable app to express
const app = express();

// Enable CORS for all routes
app.use(cors());
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//synchronizing the database and forcing it to false so we dont lose data
db.sequelize.sync({ force: true }).then(() => {
  console.log("db has been re sync");
});

//routes for the user API
app.use("/api/users", userRoutes);
app.use("/api", productRoutes);

//listening to server connection
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));
