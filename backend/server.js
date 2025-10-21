require('dotenv').config();

const Path = require('node:path');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.static(Path.resolve(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3500;

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

app.use('/api/players-backend', require('./routes/playersRoutesBackend.js'));
app.use('/api/new-player', require('./routes/newPlayerRoutesBackend.js'));
app.use('/api/players-frontend', require('./routes/playersRoutesFrontend.js'));
// app.use('/users-backend', require('./routes/userRoutesBackend.js'));
