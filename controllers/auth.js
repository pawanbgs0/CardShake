const User = require('../models/user');
const bcrypt = require('bcryptjs');

const nodemailer = require('nodemailer');
const config = require('./../../.config');

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.sendinblue.com',
  port: 587,
  secure: false,
  auth: {
    user: config.brevo.email,
    pass: config.brevo.password,
  },
});

exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  let successMessage = req.flash('success');
  if (successMessage.length > 0) {
    successMessage = successMessage[0];
  } else {
    successMessage = null;
  }

  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false,
    errorMessage: message,
    seccessMessage: successMessage
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false,
    errorMessage: message
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const existingUser = User.findUser(email);

  if (existingUser === undefined){
    req.flash('error', 'Invalid email.');
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
      req.flash('error', 'Invalid Password.');
      res.redirect('/login');
    })
    .catch(err => {
      console.log(err);
      req.flash('error', 'Invalid email or password.');
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
            req.flash('error', 'Password didn\'t matched.');
            return res.redirect('/signup'); // Redirect here if password didn't match
          }

          // Create a new user with the hashed password
          const user = new User(email, hashedPassword);
          user.save();
          req.flash('success', 'Registration successful!');
          res.redirect('/login');
          return transporter.sendMail({
            from: 'support@cardshake.com',
            to: email,
            subject: 'Congratulations!',
            // text: 'Hello',
            html: '<h1>Congratulations on signing up with CardShake!</h1>',
          })
        })
        .catch((err) => {
          console.log(err);
          req.flash('error', 'Invalid Request.');
          res.redirect('/login');
        });
    })
    .catch((err) => {
      console.log(err);
      req.flash('error', 'Invalid Request.');
      res.redirect('/');
    });
};


exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};