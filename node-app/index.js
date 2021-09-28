const express = require('express');
const app = express();
const port = 3000;
const config = {
    host: 'db-node-app',
    user: 'root',
    password: 'root',
    database: 'nodedbapp'
}

let users = [];

const mysql = require('mysql');
const connection = mysql.createConnection(config);

const insertSql = `INSERT INTO users(name) values('Dernando')`;
connection.query(insertSql);

const selectSql = `SELECT name FROM users`;
        
connection.query(selectSql, (err, result) => {
    users = JSON.parse(JSON.stringify(result));
});
connection.end();

app.use('/', (req, res) => {
    usersList = `<ul>`;
    
    users.map(user => {
        usersList += '<li>';
        usersList += user.name;
        usersList += '</li>';
    });
    usersList += `</ul>`;

    res.send(`
        <h1>Full Cycle Rocks!</h1>
        <h2>Nomes cadastrados</h2>
        ${usersList}
    `);
    
});

app.listen(port, () => {
    console.log('Rodando na porta' + port);
})