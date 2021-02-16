const ejs = require('ejs');
const fs =  require("fs");
const color = require('colors')
require('dotenv').config();

"use strict";
const nodemailer = require("nodemailer");

const timer = ms => new Promise(res => setTimeout(res, ms))


// async..await is not allowed in global scope, must use a wrapper
async function main() {
    let html = await ejs.renderFile("letter.ejs",{name:process.env.JUDUL});
    
    let transporter = nodemailer.createTransport({
        host: process.env.host,
        port: process.env.port,
        secure: process.env.secure, // true for 465, false for other ports
        auth: {
            user: process.env.user, // generated ethereal user
      pass: process.env.pass, // generated ethereal password
    },
  });
  
  // send mail with defined transport object

var array = fs.readFileSync('mailist.txt').toString().split("\n");

  for (let index = 0; index < array.length; index++) {
    
        let info = await transporter.sendMail({
          from: process.env.from, // sender address
          to: array[index], // list of receivers
          subject: process.env.subject, // Subject line
          text: process.env.text, // plain text body
          html, // html body
          priority:process.env.priority
        });
        console.log(`succesfully sent to => ${info.accepted}`.bgRed.white)
        
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
        // Preview only available when sending through an Ethereal account
        // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

        await timer(1000);
      
      
  }
}

main().catch(console.error);

