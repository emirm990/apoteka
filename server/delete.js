const fs = require("fs");
const path = require("path");
var mysql = require('mysql');

formatedPictureList = [];

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "apoteka"
});

const deleteFiles = () => {
    fs.readdir('public/uploads/images', function (err, files) {
        if (err) {
            console.log(err);
        } else {
            con.connect(function (err) {
                if (err) throw err;
                con.query("SELECT picture FROM images", function (err, result, fields) {
                    if (err) throw err;
                    let resultsFiltered = [];
                    for (let i = 0; i < result.length; i++) {
                        resultsFiltered.push(result[i].picture)
                    }
                    let deletable = [];
                    deletable = files.filter(x => !resultsFiltered.includes(x));
                    for (let i = 0; i < deletable.length; i++) {
                        fs.unlink('./public/uploads/images/' + deletable[i], (err) => {
                            console.log(err);
                        });
                    }
                });
            });
        }
    });

}

exports.deleteFiles = deleteFiles;