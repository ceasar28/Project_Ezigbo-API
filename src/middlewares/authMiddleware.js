//importing modules
const express = require("express");
const { User } = require("../models");
//Assigning db.users to User variable
// const User = db.users;

//Function to check if username or email already exist in the database
//this is to avoid having two users with the same username and email
const saveUser = async (req, res, next) => {
  //search the database to see if user exist
  try {
    const username = await User.findOne({
      where: {
        name: req.body.name,
      },
    });
    //if username exist in the database respond with a status of 409
    if (username) {
      return res
        .status(409)
        .json({ message: "name already taken", status: 409 });
    }

    //checking if email already exist
    const emailcheck = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    //if email exist in the database respond with a status of 409
    if (emailcheck) {
      return res
        .status(409)
        .json({ message: "email already taken", status: 409 });
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

//exporting module
module.exports = {
  saveUser,
};
