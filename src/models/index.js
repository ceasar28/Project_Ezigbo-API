const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv").config();

//Database connection with dialect of postgres specifying the database we are using
//port for my database is 5433
//database name is discover
const sequelize = new Sequelize(
  process.env.DB_URL,
  //`postgres://postgres:1998born@localhost:5432/ezigbo`,
  {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // This setting allows you to bypass SSL verification (use carefully)
      },
    },
  }
);

//checking if connection is done
sequelize
  .authenticate()
  .then(() => {
    console.log(`Database connected to ezigbo`);
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
