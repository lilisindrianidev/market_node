const express = require('express')
const app = express()
var mysql = require('mysql')
const circularJSON = require('circular-json');
var cors=require('cors');

app.use(cors({origin:true,credentials: true}));
var db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: '',
  database: 'market',
  port: 3306
})
var database_connection_status = '';
db.connect(function (error) {
  if (error) {
    database_connection_status = 'connection to database error';
    console.log("Tale error");

  }
  else {
    database_connection_status = 'connection to database success';
    console.log("Tale created yes");

  }


  let sql="SELECT products.id, products.nama as prodNama, products.kode, products.harga, categories.nama as catNama FROM products LEFT JOIN categories ON categories.id=id_categories"
  app.get('/products', (req, res) => {
    db.query(sql, (err, results, fields) => {
      if (err) {
        console.log("cant show prod")
      }
      else {
        console.log(" show prod")
      }
      res.send(results);
    });
  });
});


app.listen(3001, (error) => {

  console.log(`App listening on port!`)
});

