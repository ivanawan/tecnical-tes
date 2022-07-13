const express = require('express');
const app = express();
const session = require("express-session");
var mysql = require('mysql');
const PORT = 3000;
const hbs = require("hbs");
app.set('view engine','hbs');
app.use('/image', express.static(__dirname + '/src/image'));
app.use('/public', express.static(__dirname + '/src/css'));
app.use(express.urlencoded({ extended: false }));
app.use(
    session({
      secret: 'rahasia',
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 1000 * 60 * 60 * 6 },
    })
  );
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });

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

app.get('/add',(req,res)=>{
    if ( req.session.isLogin ) {
      return  res.render('add')
    }
    return res.redirect('/');
});

app.post('/edit/:id',(req,res)=>{
    con.query(`update collections_tb set name='${req.body.name}'  WHERE id=${req.params.id}`);
    return res.redirect('/');
});

app.post('/done/:id',(req,res)=>{
    const sql=`SELECT collections_tb.id as collections_id,collections_tb.user_id,collections_tb.name as collections_name,task_tb.* FROM collections_tb INNER JOIN task_tb ON task_tb.collections_id=collections_tb.id WHERE task_tb.collections_id= ${req.params.id}`
    con.query(sql,(err,reslt)=>{
     reslt.forEach(e => {
        if(req.body["done[]"].includes(e.id.toString())){
         con.query(`update task_tb set is_done=1  WHERE id=${e.id}`);
        }else{
            if(e.is_done === 1 ){
                    con.query(`update task_tb set is_done=0  WHERE id=${e.id}`);
                
            }
        }


     });
     return res.redirect('/');
    });
});

app.get('/edit/:id',(req,res)=>{
    let session = req.session;
    con.query(`select * FROM collections_tb WHERE id=${req.params.id}`,(err,reslt)=>{
        if(session.isLogin){
            if(reslt[0].user_id === session.user.id){
                res.render('edit',{data:reslt[0],
                    login:session.isLogin,
                    user:session.user
                });
            }
        }
    });
});


app.get('/delete/:id',(req,res)=>{
    con.query(`DELETE FROM task_tb WHERE collections_id=${req.params.id}`);
    con.query(`DELETE FROM collections_tb WHERE id=${req.params.id}`);
    return res.redirect('/');
});

app.post('/add',(req,res)=>{
    if ( req.session.isLogin ) {
        let sql=`INSERT INTO collections_tb ( name, user_id) VALUES ('${req.body['name']}', ${req.session.user.id})`;
        con.query(sql,(err,reslt)=>{
           console.log(reslt);
           req.body["task[]"].forEach(e => {
             console.log(e,reslt);
             con.query(`INSERT INTO task_tb ( name,collections_id) VALUES ('${e}',${reslt.insertId}) `);
           });

        });

      }
      return res.redirect('/');
});



app.get('/colection/:id',(req,res)=>{
    let session= req.session;
    const sql=`SELECT collections_tb.id as collections_id,collections_tb.user_id,collections_tb.name as collections_name,task_tb.* FROM collections_tb INNER JOIN task_tb ON task_tb.collections_id=collections_tb.id WHERE task_tb.collections_id= ${req.params.id}`
    con.query(sql,(err,reslt)=>{
        
       let same = false;

       if(session.isLogin){
        if(reslt[0].user_id === session.user.id){ same=true }
        }
      
       
     res.render('detail',{
            login:session.isLogin,
            user:session.user,
            task:reslt,
            same:same,
            collections_name:reslt[0].collections_name,
            collections_id:reslt[0].collections_id
            });
    });
});


app.get('/',async (req, res) => {
  
        let session= req.session;
        con.query(`SELECT *  FROM collections_tb `,(req,reslt)=>{
         res.render('index',{
             login:session.isLogin,
             user:session.user,
             collections:reslt
         });
        });
    
 });

app.post('/login',(req,res)=>{
    con.query(`select * from users_tb where email= '${req.body.email}'`, function (err, result) {
        if (err) throw err;
        if(result[0].password === req.body.password){
            console.log('login success');
           
            req.session.isLogin = true;
            req.session.user = {
              id: result[0].id,
              email: result[0].email,
              name: result[0].username,
            };
            return res.redirect('/');
        }else{ 
            console.log(result.password,req.body.password);
            console.log('login failed');
            return res.redirect('/');
        }
});
})

app.post('/register',(req,res)=>{
    let sql =`INSERT INTO users_tb (username, email,password) VALUES ( '${req.body.username}', '${req.body.email}', '${req.body.email}')`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      con.query(`select id, username, email from users_tb where id= ${result.insertId}`, function (err, result) {
        if (err) throw err;
        req.session.isLogin = true;
        req.session.user = {
          id: result.id,
          email: result.email,
          name: result.username,
        };

        return res.redirect('/');

      });
    });
});

app.get('/logout',(req,res)=>{
    req.session.destroy();
});


hbs.registerHelper('list', function (item) {
    return `<p>${item.name}</p><input type="checkbox" name="done[]"  value=${this.id} ${item.is_done === 1 ? `checked="checked"`:""} class="checkbox" />`;
})