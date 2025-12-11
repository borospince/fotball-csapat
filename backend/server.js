require('dotenv').config();

const path = require('node:path');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.static(path.resolve(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3500;

// MongoDB kapcsolat
const dbConneciton = require('./utils/dbConnection.js');

dbConneciton()
    .then(() => {
        console.log('sikeres adatbázis csatlakozás!');
        app.listen(PORT, () => {
            console.log(`http://localhost:${PORT}/api`);
        });
    })
    .catch((error) => {
        console.log(error.message);
    });

app.get('/api', (req, res) => {
    try {
        res.statusCode = 200;
        return res.render('index');
    } catch (error) {
        res.statusCode = 404;
        return res.render('404.ejs');
    }
});

// EDDIGI ROUTE-OK
app.use('/api/players-backend', require('./routes/playersRoutesBackend.js'));
app.use('/api/new-player', require('./routes/newPlayerRoutesBackend.js'));
app.use('/api/players-frontend', require('./routes/playersRoutesFrontend.js'));
app.use('/api/items-backend', require('./routes/ItemsRoutesBackend.js'));
app.use('/api/new-item', require('./routes/newItemRoutesBackend.js'));
app.use('/api/items-frontend', require('./routes/itemsRoutesFrontend.js'));
app.use('/api/register-frontend', require('./routes/users/userRegisterRoutes.js'));
app.use('/api/login-frontend', require('./routes/users/userLoginRoutes.js'));
app.use('/api/users-backend', require('./routes/userRoutesBackend.js'));
app.use('/api/tickets', require('./routes/ticketRoutes.js')) ;

// 🔥 ÚJ FAN MAIL ROUTE – EZT ADTAM HOZZÁ 🔥
app.use('/api/fans/all', require('./routes/users/fanMailRoutes.js'));
