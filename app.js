const path = require('path');
const express = require('express');

const errorController = require('./controllers/error');

const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.set('views', 'views');

const dashRoutes = require('./routes/dashboard');
const authRoutes = require('./routes/auth');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/', dashRoutes);
app.use(authRoutes);

app.use(errorController.get404);

app.listen(3000);