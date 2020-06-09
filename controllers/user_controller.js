/* eslint-disable camelcase */
const fs = require('fs');
const uu = require('uuid');
const users = require('../models/user_model');

module.exports = {
  create: async (req, res) => {
    // desturing for quick retrieving of inputs
    const {
      first_name, last_name, email, phone, password, cpassword,
    } = req.body;
    // hash your password with bycrypt
    try {
      // create category
      const newUser = {
        id: uu.v4(),
        first_name,
        last_name,
        email,
        phone,
        password,
        cpassword,
      };
      // check if they actually forward the name and email details
      if (first_name === '' || last_name === '' || email === '' || phone === '' || password === '' || cpassword === '') {
        return res.status(400).json({ msg: 'please include all fields' });
      }

      if (password !== cpassword) {
        return res.status(400).json({ msg: "Password didn't correspond" });
      }


      users.push(newUser);
      fs.writeFileSync('models/userdata.json', JSON.stringify(users));
      // return res.status(400).send({message:"failed to register"})


      return res.status(200).json({ message: 'Registration succesful', data: users });
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  login: async (req, res) => {
    // validate the user first
    const { email, password } = req.body;
    // validate the user
    try {
      const found = users.some((user) => user.email === email && user.password === password);
      if (found) {
        //  res.json(users.filter(users=>users.email===email));
        res.status(200).json({ message: 'Success', Token: uu.v4(), found });
      } else {
        res.status(400).json({ msg: 'user not found' });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
