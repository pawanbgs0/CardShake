const path = require('path');
const express = require('express');
const session = require('express-session');
const User = require('./models/user');

const errorController = require('./controllers/error');

const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.set('views', 'views');

// Session middleware should be defined before other middlewares and routes
app.use(
  session({
    secret: 'secret-key', // I'll change later
    resave: false,
    saveUninitialized: false,
  })
);

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

// Other middlewares and routes
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

const dashRoutes = require('./routes/dashboard');
const authRoutes = require('./routes/auth');

app.use('/', dashRoutes);
app.use(authRoutes);

// Error handling middleware
app.use(errorController.get404);
app.use(errorController.get500);

app.listen(3000);
