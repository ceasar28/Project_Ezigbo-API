//importing modules
// https://medium.com/@rachealkuranchie/node-js-authentication-with-postgresql-sequelize-and-express-js-20ae773da4c9
const { Sequelize, DataTypes } = require("sequelize");

//Database connection with dialect of postgres specifying the database we are using
//port for my database is 5433
//database name is discover
const sequelize = new Sequelize(
  `postgres://postgres:1998born@localhost:5432/ezigbo`,
  { dialect: "postgres" }
);

//checking if connection is done
sequelize
  .authenticate()
  .then(() => {
    console.log(`Database connected to discover`);
  })
  .catch((err) => {
    console.log(err);
  });

// Importing models
const UserModel = require("./UserModel");
const ProductModel = require("./ProductModel");

// Define models
const User = UserModel(sequelize, Sequelize);
const Product = ProductModel(sequelize, Sequelize);

// Define associations
User.hasMany(Product, { foreignKey: "manufacturerId" });
Product.belongsTo(User, { foreignKey: "manufacturerId" });

// Export the Sequelize instance and models
module.exports = {
  sequelize,
  User,
  Product,
};
