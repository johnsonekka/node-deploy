const jwt = require('jsonwebtoken');
const model = require('../model/user')
const User = model.User;
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const privateKey = fs.readFileSync(path.resolve(__dirname,'../private.key'),'utf-8');

exports.signUp = async (req, res) => {
  try {
    const user = new User(req.body);
    var token = jwt.sign({ email: req.body.email },privateKey,{ algorithm: 'RS256' });
    const hash = bcrypt.hashSync(req.body.password, 10);

    user.token = token;
    user.password = hash;
    const savedUser = await user.save();
    console.log("User saved:", savedUser);

    // Send a success response with the saved product
    res.status(201).json({token});
  } catch (error) {
    if (error) {
      res.status(400).json(error);
    }
    // Handle errors here
    console.error("Error sign up:", error);

    // Send an error response with a status code of 500
    // res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.login = async (req, res) => {
  try {
    const doc = await User.findOne({email:req.body.email});
    const isAuth = bcrypt.compareSync(req.body.password, doc.password);
    if(isAuth){
      var token = jwt.sign({ email: req.body.email },privateKey,{ algorithm: 'RS256' });
      doc.token = token
      await doc.save()
    }else{
      res.sendStatus(401);
    }

    // Send a success response with the saved product
    res.status(201).json({token});
  } catch (error) {
    if (error) {
      res.status(400).json(error);
    }
    // Handle errors here
    console.error("Error login:", error);

    // Send an error response with a status code of 500
    // res.status(500).json({ error: 'Internal Server Error' });
  }
};