const express=require('express')
const app= express()
var mysql = require('mysql')
var bodyParser = require("body-parser");
var cors=require('cors');
app.use(express.json());
app.use( bodyParser.json() );  
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors({origin:true,credentials: true}));
var db = mysql.createConnection({
  user:'root',
  host: 'localhost',
  password: '',
  database: 'market',
  port:3306
})
var database_connection_status='';
db.connect(function(error){
  if(error){
    database_connection_status='connection to database error';
    console.log("Tale error");

  }
  else{
    database_connection_status='connection to database success';
    console.log("Tale created yes");

  }

  
  var prod = "CREATE TABLE products (id INT AUTO_INCREMENT PRIMARY KEY, kode VARCHAR(255), nama VARCHAR(255), harga BIGINT(100), gambar text(255),id_categories int(11))";
  db.query(prod,function(err,result){
    if(error){
      database_connection_status='products error';
    }
    else{
      'CREATE INDEX id_categories ON products(categories_id)'
      database_connection_status='products success';
      console.log("Tale created");
    }
  
   
  })
  var menu = "CREATE TABLE menus (id INT AUTO_INCREMENT PRIMARY KEY, jumlah_total BIGINT(100), total_harga BIGINT(100),id_categories int(11),id_products int(11))";
  db.query(menu,function(err,result){
    if(error){
      database_connection_status=' menus error';
    }
    else{
      database_connection_status=' menus success';
      console.log("Tale created");
    }
  
   
  })
  var cate = "CREATE TABLE categories (id INT AUTO_INCREMENT PRIMARY KEY, nama VARCHAR(255))";
  db.query(cate,function(err,result){
    if(error){
      database_connection_status=' cate error';
    }
    else{
      database_connection_status=' cate success';
      console.log("Tale created");
    }
  
   
  })
  var pesan = "CREATE TABLE pesanans (id INT AUTO_INCREMENT PRIMARY KEY, total_bayar BIGINT(20), id_menus int(11))";
  db.query(pesan,function(err,result){
    if(error){
      database_connection_status=' pesan error';
    }
    else{
      database_connection_status=' pesan success';
      console.log("Tale created");
    }

  })


//show Data
  let join_cate="SELECT * FROM categories"
  app.get('/categories', (req, res) => {
    db.query(join_cate, (err, results, fields) => {
      if (err) {
        console.log("cant show categories")
      }
      else {
        console.log(" show categories")
      }
      res.send(results);
      console.log(results)
    });
  });
  let sql="SELECT menus.id, menus.jumlah_total, menus.total_harga, products.nama, products.harga, products.id as idProd FROM menus LEFT JOIN products ON products.id=id_products"

  app.get('/keranjangs', (req, res) => {
    db.query(sql, (err, results, fields) => {
      if (err) {
        console.log("cant show keranjabfs")
      }
      else {
        console.log(" show kr=eranjansd")
      }
      res.send(results);
      console.log(results)
      
    });
  });
  let sql2="SELECT products.id, products.nama, products.kode, products.harga FROM products"

  app.get('/try', (req, res) => {
    db.query(sql2, (err, results, fields) => {
      if (err) {
        console.log("cant show keranjabfs")
      }
      else {
        console.log(" show kr=eranjansd")
      }
      res.send(results);
      console.log("try:",results)
      
    });
  });
    // app.listen(3001, (error) => {
    
    //   console.log(`App listening on port!`)
    // });


//couple life 3d //become an office queen

    let join_prod="SELECT products.id, products.nama as prodNama, products.kode, products.harga, categories.nama, categories.id FROM products INNER JOIN categories ON categories.id=id_categories"
    app.get('/products', (req, res) => {
      db.query(join_prod, (err, results, fields) => {
        if (err) {
          console.log("cant show prod")
        }
        else {
          console.log(" show prod")
        }
        res.send(results);
      console.log(results)
      });
    });

    app.get('/products2/:id', (req, res) => {
      const id=req.params.id;
      let join_prod2="SELECT menus.id, menus.jumlah_total, menus.total_harga, products.nama, products.harga, products.id as idProd FROM menus LEFT JOIN products ON products.id=id_products WHERE products.id=?"

      
      db.query(join_prod2,id, (err, results, fields) => {
        if (err) {
          console.log("cant show prod")
        }
        else {
          console.log(" show prod")
        }
        res.send(results);
      console.log("aku cinta",results)
      });
    });
    app.get('/products3/:nama', (req, res) => {
      const nama=req.params.nama;
      let join_prod3="SELECT products.id, products.nama as prodNama, products.kode, products.harga, categories.nama, categories.id FROM products  INNER JOIN categories ON categories.id=id_categories WHERE categories.nama=? "

      
      db.query(join_prod3,nama, (err, results, fields) => {
        if (err) {
          console.log("cant show prod")
        }
        else {
          console.log(" show prod")
        }
        res.send(results);
      console.log("aku cinta",results)
      });
    });

  //post
  //npm i body-parser
 



  app.post('/keranjangsInsert', bodyParser.json(), (req, res) => {
    console.log(req.body.total_harga)
    const total_harga=req.body.total_harga;
    const jumlah_total=req.body.jumlah_total;
    const id_products=req.body.id_products;
    var post_ker =`INSERT INTO menus (total_harga,jumlah_total,id_products) VALUES('${total_harga}','${jumlah_total}','${id_products}')`;
    db.query(post_ker, function (err, result) {
      // var sql = `INSERT INTO menus (total_harga, jumlah_total) VALUES( ?, ?)`;
      // db.query(sql, [total_harga,jumlah_total], function (err, result) {
      if (err) {
        console.log("create is", err)
      }
      else {
       
          console.log(" created")
          res.send(result);
        
 
      }
      
    }); 
  });

 
  app.put("/keranjangsUpdate/:id",(req,res)=>{
    const ido=req.params.id;
    const jumlah_total=req.body.jumlah_total;
    const total_harga=req.body.total_harga;
   
 
    db.query('UPDATE menus SET total_harga=?,jumlah_total=? WHERE id=?',[total_harga,jumlah_total,ido],(err,results)=>{
      if (err) {
        console.log("cant update",err)
      } 
      else {
        if(results.affectedRows==0){
          res.send("id not present")
        }
        else{
          console.log(" updated")
          res.send(results);
        }
        
      }
      
    })
  })
  app.post('/pesanans', bodyParser.json(), (req, res) => {
    const total_bayar=req.body.total_bayar;
   
    const id_menus=req.body.id_menus;
    var post_pes =`INSERT INTO menus (total_bayar,id_menus) VALUES('${total_bayar}','${id_menus}')`;
    db.query(post_pes, function (err, result) {
      // var sql = `INSERT INTO menus (total_harga, jumlah_total) VALUES( ?, ?)`;
      // db.query(sql, [total_harga,jumlah_total], function (err, result) {
      if (err) {
        console.log("pesanans is", err)
      }
      else {
       
          console.log("pesanans created")
          res.send(result);
        
 
      }
      
    }); 
  });
})

app.listen(3001, function(){
  console.log("yay")
  db.connect(function(err){
    //if(err) ;
    console.log("hello")
  })
})
