const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const existingUser = User.findUser(email);

  if (existingUser === undefined){
    console.log('user doesn\'t exists');
    return res.redirect('/login');
  }
  // console.log(password, existingUser.password);
  bcrypt
    .compare(password, existingUser.password)
    .then(doMatch => {
      if (doMatch) {
        // console.log("matched should login");
        req.session.isLoggedIn = true;
        req.session.user = existingUser;
        return req.session.save(err => {
          // console.log("session returned");
          console.log(err);
          console.log(req.session.isLoggedIn);
          res.redirect('/');
        });
      }
      console.log('Invalid password');
      res.redirect('/login');
    })
    .catch(err => {
      console.log(err);
      res.redirect('/login');
    });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  let passwordMatch = true; // Flag to check password match

  // Hash the password
  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      // Compare hashed password with confirmPassword
      bcrypt
        .compare(confirmPassword, hashedPassword)
        .then((doMatch) => {
          if (!doMatch) {
            console.log('Password didn\'t match');
            passwordMatch = false; // Set the flag to false
          }

          // Check if the user already exists
          const existingUser = User.findUser(email);

          if (existingUser !== undefined) {
            console.log('User exists');
            return res.redirect('/login');
          }

          if (!passwordMatch) {
            return res.redirect('/signup'); // Redirect here if password didn't match
          }

          // Create a new user with the hashed password
          const user = new User(email, hashedPassword);
          user.save();
          res.redirect('/login');
        })
        .catch((err) => {
          console.log(err);
          res.redirect('/login');
        });
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/');
    });
};


exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};