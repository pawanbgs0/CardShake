const path = require('path');
const express = require('express');
const session = require('express-session');
const User = require('./models/user');
const csrf = require('csurf');

const errorController = require('./controllers/error');

const app = express();
const bodyParser = require('body-parser');
const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
// Session middleware should be defined before other middlewares and routes
app.use(
  session({
    secret: 'secret-key', // I'll change later
    resave: false,
    saveUninitialized: false,
  })
);

app.use(csrfProtection); // the position should be after sessions/cookies

// Custom middleware for handling session user data
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  const existingUser = User.findUser(req.session.user.email);

  if (existingUser === undefined) {
    console.log('User doesn\'t exist');
    req.user = req.session.user;
  }
  next();
});


// local variable calls
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

// Other middlewares and routes
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

const dashRoutes = require('./routes/dashboard');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

app.use('/', dashRoutes);
app.use(authRoutes);
app.use(adminRoutes);

// Error handling middleware
app.use(errorController.get404);
app.use(errorController.csrfError);

app.listen(3000);