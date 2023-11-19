const { Product } = require("../models");

const SignInProduct = async (req, res) => {
  try {
    const { productName, transactionHash, manufacturerId } = req.body;
    const data = { productName, transactionHash, manufacturerId };

    // saving the user
    const product = await Product.create(data);

    if (product) {
      return res.status(201).json({ message: "product signed succefully" });
    }

    return res.status(400).json({ message: "failed to sign product" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  SignInProduct,
};
