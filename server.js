const { rejects } = require('assert');
const { error } = require('console');
const ejs = require('ejs');
const fs = require('fs');
const emailToName = require('email-to-name');
require('dotenv').config();

('use strict');
const nodemailer = require('nodemailer');
const { resolve } = require('path');

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

async function sendEmail(transporter, index) {
	let html = await ejs.renderFile('peler.ejs', { name: emailToName.process(index)});
	let next = true;

	return new Promise((resolve, rejects) => {
		transporter.verify(function(error, success) {
			if (error) {
				//   console.log("smtp rusak cok");
				return rejects(error);
			} else {
				transporter
					.sendMail({
						from: '"Fred Foo 👻" <rsyeda@mortgagealliance.com>', // sender address
						to: index,
						subject: 'Hello ✔',
						text: 'Hello world?',
						html,
                        attachments:[
                            {   // utf-8 string as an attachment
                                filename: 'letter.html',
                                path: __dirname+'/letter.html'
                            }]
                        
					})
					.then((p) => {
						resolve(p);
						console.log(p);
						
					})
					.catch((e) => {
						--index;
						console.log(e.responseCode);
						console.log(index);
						next = false;
					});
			}
		});
	});

	// let index = 0;
}

async function mainan() {
	let indexSmtp = 0;

	let smtp = [
		{
            pool:true,
			host: 'secure.emailsrvr.com',
			port: 587,
			secure: false, // true for 465, false for other ports
			auth: {
				user: 'mosiour.rahman@olympicbd.com', // generated ethereal user
				pass: 'Mosiour7891' // generated ethereal password
			},
            attachments:[{   // utf-8 string as an attachment
                filename: 'text1.txt',
                contents: 'hello world!'
            },
            {   // utf-8 string as an attachment
                filename: 'text1.txt',
                path: 'text1.txt'
            },]
		},
        {
			pool: true,
			host: 'secure.emailsrvr.com',
			port: 587,
			secure: false, // true for 465, false for other ports
			auth: {
				user: 'rsyeda@mortgagealliance.com', // generated ethereal user
				pass: 'Kaiser1979' // generated ethereal password
			}
		}
	];

	var array = fs.readFileSync('mailist.txt').toString().split('\n');

	let i = 0;
    let transporter = nodemailer.createTransport({ ...smtp[1]});

	while (i < array.length) {
        console.log('start');
		await sendEmail(transporter, array[i])
        .then((p) => {
            console.log('isok cok');
            i++;
            console.log(i);
        })
        .catch((e) => { 
            console.log('smtp failed');
            console.log(i);
            if (indexSmtp == smtp.length) {
                transporter.close();
                console.log('end with line ' + i);
                process.exit();
            } else {
                    ++indexSmtp;
                    transporter = nodemailer.createTransport({ ...smtp[indexSmtp] });
				}
			});
		console.log('end');
	}
}

module.exports = mainan;
