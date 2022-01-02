
const express = require('express');
const res = require('express/lib/response');
const mysql = require('mysql');
const ejs = require('ejs');
const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
let test=[0,0,0,0];
let ans=[1,0,1,0];
let score=0;
let media=0;



const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'kenshi6318053',
  database: 'data'  
});
connection.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('success');
});
app.get('/', (req, res) => {
  connection.query(
    (error, results) => {
      res.render('top.ejs');
    }
  );
});
app.get('/check',(req,res)=>{
  res.render('check.ejs');
});
app.post('/test1',(req,res) => {
  connection.query(
    'INSERT INTO data(a,b,c,d,e,f,g,h,i,j,k,l) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)',
    [req.body.a,req.body.b,req.body.c,req.body.d,req.body.e,req.body.f,req.body.g,req.body.h,req.body.i,req.body.j,req.body.k,req.body.l],
    (error, results) => {
      media =req.body.a+req.body.b+req.body.c+req.body.d+req.body.e+req.body.f+req.body.g+req.body.h+req.body.i+req.body.j+req.body.k+req.body.l;
      res.render('test1.ejs');
    }
  );
})
app.post('/test2',(req,res) => {
  connection.query(
   'INSERT INTO data(test1) VALUE(?)',
   [req.body.change],
    (error, results) => {
      test[0]=Number(req.body.change);
      res.render('test2.ejs');
    }
  );
})
app.post('/test3',(req,res) => {
  connection.query(
    'INSERT INTO data(test2) VALUE(?)',
    [req.body.change],
    (error, results) => {
      test[1]=Number(req.body.change);
      res.render('test3.ejs');
    }
  );
})
app.post('/test4',(req,res) => {
  connection.query(
    'INSERT INTO data(test3) VALUE(?)',
    [req.body.change],
    (error, results) => {
      test[2]=Number(req.body.change);
      res.render('test4.ejs');
    }
  );
})
app.post('/result',(req,res)=>{
  connection.query(
    'INSERT INTO data(test4) VALUE(?)',
    [req.body.change],
    (error, results) => {
      score=0;
      console.log(score);
      test[3]=Number(req.body.change);
      for(let i=0;i<4;i++){
        if(test[i]===ans[i]){
          score ++;
        }else{
          score += 0;
        }
      }
      console.log(test);
      console.log(ans);
      console.log(score);
      if(0<=score &&score<=1){
      res.render('result1.ejs');
    }else if(score===2){
      res.render('result2.ejs');
    }else if(score===3){
      res.render('result3.ejs');
    }else if(3<score&&score<100){
      res.render('result4.ejs');
    }}
  );  
})

app.listen(3000);