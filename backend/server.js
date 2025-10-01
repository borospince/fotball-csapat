require('dotenv').config();

const Path = require('node:path');
const express = require('express');
const app = express();

app.use(express.static(Path.resolve(__dirname,'public')));
app.set('view engine','ejs');

const PORT = process.env.PORT || 3500;

const dbConneciton = require('./utils/dbConnection.js');
const { error } = require('node:console');

dbConneciton()
    .then(() => {
        console.log('sikeres adatbázis csatlakozás!');
        app.listen(PORT, () => {
            console.log(`http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error.message);
    });

app.listen(PORT,() => {
    console.log(`http://localhost:${PORT}`);
});

app.get('/',(req,res) => {
    try{
        res.statusCode = 200;
        return res.render('index');
    } catch (error) {
        res.statusCode = 404;
        return res.render('404.ejs');
    }
});

app.use('/users-backend', require('./routes/userRoutesBackend.js'));