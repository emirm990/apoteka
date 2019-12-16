const mysql = require('mysql');

module.exports = function create() {
    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "apoteka"
    })
    connection.query('CREATE DATABASE IF NOT EXISTS apoteka', function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("apoteka DATABASE created.");
        }
    })
    connection.query('CREATE TABLE NOT EXISTS items (id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,name VARCHAR(30),description TEXT(255),price FLOAT(50),stock INT);', function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Users TABLE created.');
        }
    });
}
