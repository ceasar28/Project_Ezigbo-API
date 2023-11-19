//importing modules
const bcrypt = require("bcryptjs");
const { User } = require("../models");
const jwt = require("jsonwebtoken");

// Assigning users to the variable User
// const User = db.users;

//signing a user up
//hashing users password before its saved to the database with bcrypt
const signup = async (req, res) => {
  try {
    const { name, email, password, address, cacNumber, phoneNumber, role } =
      req.body;
    const data = {
      name,
      email,
      address,
      cacNumber,
      phoneNumber,
      role,
      password: await bcrypt.hash(password, 10),
    };
    //saving the user
    const user = await User.create(data);

    //if user details is captured
    //generate token with the user's id and the secretKey in the env file
    // set cookie with the token generated
    if (user) {
      let token = jwt.sign({ id: user.id }, process.env.secretKey, {
        expiresIn: 1 * 24 * 60 * 60 * 1000,
      });

      res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
      console.log("user", JSON.stringify(user, null, 2));
      console.log(token);
      //send users details
      return res
        .status(201)
        .json({ user, message: "Account created", status: 201 });
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "there was an error try again", status: 400 });
  }
};

//login authentication

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //find a user by their email
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    //if user email is found, compare password with bcrypt
    if (user) {
      const isSame = await bcrypt.compare(password, user.password);

      //if password is the same
      //generate token with the user's id and the secretKey in the env file

      if (isSame) {
        let token = jwt.sign({ id: user.id }, process.env.secretKey, {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });

        //if password matches wit the one in the database
        //go ahead and generate a cookie for the user
        res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
        console.log("user", JSON.stringify(user, null, 2));
        console.log(token);
        //send user data
        return res
          .status(201)
          .json({ user, message: "login Successful", status: 201 });
      } else {
        return res.status(401).json({ message: "email or password wrong" });
      }
    } else {
      return res.status(401).json({ message: "email or password wrong" });
    }
  } catch (error) {
    console.log(error);
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0, httpOnly: true });
    return res.status(200).send("Logged out successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Failed to logout");
  }
};

module.exports = {
  signup,
  login,
  logout,
};
