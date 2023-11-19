// product model

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      productName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      transactionHash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      manufacturerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    { timestamps: true }
  );

  Product.associate = (models) => {
    // Define associations
    Product.belongsTo(models.User, {
      foreignKey: "manufacturerId",
      onDelete: "CASCADE", // You can set the onDelete behavior as per your requirement
    });
  };

  return Product;
};
