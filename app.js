const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs")
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
mongoose.connect('mongodb+srv://krishnanshu:krish143@cluster0.wxqsk.mongodb.net/krishnanshu?retryWrites=true&w=majority',  { useNewUrlParser: true , useUnifiedTopology: true}  );
let port = process.env.PORT || 8080;//ye rha port
var details = new mongoose.Schema({
    Name: String,
    Username: String,
    Password:String,
    eventstartdate:Date,
    eventenddate:Date,
    Amounttaken:String,
    Amountleft:String,
    eventdayname:String
  });
  const detail = mongoose.model('detail', details);
app.use(express.urlencoded());
app.use('/static' , express.static('static'));
const pug = require('pug');
const { text } = require("body-parser");
const { stringify } = require("querystring");



app.set('view engine' , 'pug');
//setting path of the engine
app.set('views' ,path.join(__dirname,'views'));

app.get('/' , (req , res) =>{ // takki baar baar name nan change krna pdega
    res.status(200).render('index.pug')
})
// post se lene ka mtlb hi jo bnda hi usse pta ni  chlega (rqst.body ke aandr)

app.post('/' , (req , res) =>{
    const Username = req.body.Username;
    const Password = req.body.Password;
    if(Password.length != 0){
    detail.findOne({Username:Username} , (err , foundresult) =>{
      if(err){
          console.log(err);
      }else{

          if(foundresult.Password === Password){
            res.status(200).render('Finalpage.pug')
          }else{
            res.status(200).render('index.pug')
          }
      }
    })
   }else{
       res.status(400).render('index.pug')
   }
});

// submiting event data 

app.get('/Submit' , (req , res) =>{
    res.status(200).render('Submit.pug')
});

app.post('/Submit' , (req , res) =>{
    const Name = req.body.Name;
    const Username = req.body.Username;
    const Password = req.body.Password;
    const eventdayname = req.body.eventdayname;
    const eventstartdate = req.body.eventstartdate;
    const eventenddate = req.body.eventenddate;
    const Amountleft = req.body.Amountleft;
    const Amounttaken = req.body.Amounttaken
    const newUser = new detail({
        Name:Name,
        Username:Username,
        Password:Password,
        eventdayname:eventdayname,
        eventstartdate:eventstartdate,
        eventenddate:eventenddate,
        Amountleft:Amountleft,
        Amounttaken:Amounttaken
    });
    newUser.save((err) => {
        err?console.log(err):res.send('succesfully created')
    });
});
//check whether data exist or not

app.get('/registration_from' , (req , res) =>{
    res.status(200).render('registration_from.pug')
})

app.post('/registration_from' , (req , res) =>{
    const Name = req.body.Name;
    const Username = req.body.Username;
    const Password = req.body.Password;
    const newUser = new detail({
        Name:Name,
        Username:Username,
        Password:Password
    });
    newUser.save((err) => {
        err?console.log(err):res.send('done bro')
    })

})

//listern port ye rha
app.listen(port, () => {
    console.log(`The application started successfully on port `);
})
