var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "kompetensi"
});


con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });


//   let sql ="INSERT INTO `users_tb` ( `username`, `email`, `password`) VALUES ( 'ivan setiawan', 'ivan@gmail.com', 'ivansetiawan')"
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted");
//   });


//    sql ="INSERT INTO `collections_tb` ( `name`, `user_id`) VALUES ('belajar', 1 ),('main game', 1 ), ('belanja', 2 )";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted");
//   });


//   sql ="INSERT INTO `task_tb` ( `name`,`collections_id`) VALUES ('belajar react native', 1 ),('belajar solid', 1 ), ('belajar clean code', 1 )";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted");
//   });


//  get seluruh data dari table collections beserta user  yang memiliki collection tersebut
  sql ="SELECT collections_tb.id, collections_tb.name ,users_tb.username  FROM collections_tb INNER JOIN users_tb ON collections_tb.user_id=users_tb.id";
  con.query(sql, function (err, result) {
    if (err) throw err;

    console.log("get seluruh data dari table collections beserta user  yang memiliki collection tersebut");
    console.log("result ", result);
  });

  // Tampilkan seluruh data task berdasarkan collections tertentu
 sql ="SELECT *  FROM task_tb WHERE collections_id= 1 ";
  con.query(sql, function (err, result) {
    if (err) throw err;

    console.log("Tampilkan seluruh data task berdasarkan collections tertentu");
    console.log("result", result);
  });


// get  data sepesifik collections dengan taks serta user name nya
 sql ="SELECT collections_tb.id, collections_tb.name as collections_name,users_tb.username,task_tb.*  FROM collections_tb INNER JOIN users_tb ON collections_tb.user_id=users_tb.id INNER JOIN task_tb ON task_tb.collections_id=collections_tb.id WHERE task_tb.collections_id= 1 ";
  con.query(sql, function (err, result) {
    if (err) throw err;

    console.log("get  data collections dengan taks serta user name nya");
    console.log("result", result);
  });








