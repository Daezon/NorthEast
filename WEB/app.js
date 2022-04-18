console.clear();

const path = require('path');
const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const cors = require('cors');

const app = express();
const http = require('http').Server(app);
const PORT = process.env.PORT || 8080;

const UserRoutes = require('./routes/User.routes');

const AdminRoutes = require('./routes/Admin.routes');

// Midlewares
app.use(express.json());

app.use(express.static(path.join(__dirname, './public')));
app.use(express.static('image_service'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', UserRoutes);
app.use('/', AdminRoutes);
app.use(cors());

// Handlebars
let hbs = handlebars.create({});

app.set('view engine', 'hbs');
app.engine(
  'hbs',
  handlebars({
    layoutsDir: `${__dirname}/views/layout`,
    extname: 'hbs',
    defaultLayout: 'index',
    partialsDir: `${__dirname}/views/components`,
  })
);

http.listen(PORT, () => console.log(`Client listening at PORT:${PORT}`));
