require('dotenv').config();
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash'); // ตรวจสอบให้แน่ใจว่าคุณได้ติดตั้ง connect-flash ด้วย `npm install connect-flash`
const connect = require('./server/connectDB/database');
const app = express();
const port = process.env.PORT || 5000;

// Connect to the database
connect();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));

// Session middleware
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
}));

// Flash messages middleware
app.use(flash());

// Express layouts middleware
app.use(expressLayout);
app.set('layout', 'layouts/main');
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./server/routers/setpath'));

// 404 handler
app.use('*', (req, res) => {
    res.status(404).render('404');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
