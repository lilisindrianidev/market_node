const express=require('express')
const app= express()
var mysql = require('mysql')
const circularJSON = require('circular-json');

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

  
 
//show Data
 // app.use(cors());

 
})
// app.listen(3001, function(){
//   console.log("yay")
//   db.connect(function(err){
//     //if(err) ;
//     console.log("hello")
//   })
// })
