const express = require('express')
const app = express()
const port = 3000
const config = require("./config.json")
var nodemailer = require('nodemailer');
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html")
})
app.get('/mail/:mailadress/:subject/:text/:times', function (req, res) {
    res.send("Sending!")
    
    Array.from({length: Number(req.params.times) }, () =>      sendMail(req.params.mailadress, req.params.subject, req.params.text)  );  
    
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})



async function sendMail(email, betreff, inhalt){

  var transporter = nodemailer.createTransport({
    service: config.service,
    auth: {
      user: config.email,
      pass: config.pass
    }
  });
  
  var mailOptions = {
    from: config.from,
    to: email,
    subject: betreff,
    html: inhalt
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  }
