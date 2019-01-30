var  express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

const path = require('path');
var ejs =('ejs')
var app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
app.set('views',path.join(__dirname ,'views'));
app.set('view engine','ejs');


// app.use((req,res,next) => {
//   console.log("cookies",new Date())
//   // res.render('main.ejs',{he :"hay cool sachin"})
//   next()
// })

// app.get('/',(req,res)=>{
//   // res.send("start now!!");
//   // res.sendFile('index.html')
  
// })
// app.post('/contact',(req,res)=>{
//   res.send(req.body);
//   // console.log(req.body)
// })

  app.use((req,res,next) =>{
    res.cookie("ashish","sharma");
    next()
  })
app.get('/', (req,res) => {
  res.cookie("key","value");
  console.log(req.cookies);
  res.render('index.ejs');
})



app.listen(8000,()=> console.log("server start"));