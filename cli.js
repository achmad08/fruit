const inquirer = require('inquirer');
const loading = require('loading-cli');
const axios = require('axios');
require('dotenv').config();
const fs = require('fs');
const ejs = require('ejs');
const mainan = require('./server')

const color = require('colors');
// const nodemailer = require("nodemailer");

// const mainan = require('./codot');
process.stdout.write("\u001b[2J\u001b[0;0H");
console.log(`

█████████████╗██╗   ████████████╗    █████████████████╗   ████████╗█████████████╗ 
██╔════██╔══████║   ████╚══██╔══╝    ██╔════██╔════████╗  ████╔══████╔════██╔══██╗
█████╗ ██████╔██║   ████║  ██║       ████████████╗ ██╔██╗ ████║  ███████╗ ██████╔╝
██╔══╝ ██╔══████║   ████║  ██║       ╚════████╔══╝ ██║╚██╗████║  ████╔══╝ ██╔══██╗
██║    ██║  ██╚██████╔██║  ██║       ████████████████║ ╚██████████╔█████████║  ██║
╚═╝    ╚═╝  ╚═╝╚═════╝╚═╝  ╚═╝       ╚══════╚══════╚═╝  ╚═══╚═════╝╚══════╚═╝  ╚═╝
                                                                                  

`.red.yellow);


// setTimeout(function(){
// 	load.stop()
// 	process.stdout.write("\u001b[2J\u001b[0;0H");
//   },3000)



// setTimeout(function(){
    //     load.color = 'yellow';
    //     load.text = ' Loading rainbows';
    // },2000)
    
    // // stop
// setTimeout(function(){
//     load.stop()
// },3000)



async function main() {
	await axios
		.post('http://127.0.0.1:8000/api/checkip', { key: process.env.key })
		.then((p) => {
			// fs.writeFile('codot.js', p.data, (err) => {
				inquirer
				.prompt([
					{ type: 'input', name: 'name', message: 'username' },
					{ type: 'password', name: 'password', message: 'password' }
				])
				.then((p) => {
					axios.post("http://127.0.0.1:8000/api/login",{name:p.name,password:p.password})
					.then(p =>{
						process.stdout.write("\u001b[2J\u001b[0;0H");
                                // fs.writeFile('server.js', p.data,async (err) => {
                                        // if(err) return err;
                                        // setTimeout(()=>{
                                            mainan()
                                        // },2000)
                                // })  
                            })
                            .catch(e =>{
                                console.log(e.response.data[0])
                            });
                    
                    })
					.catch((e) =>{
                         console.log(e)
                        })

				// if(err) return err;
				// console.log("sukses")
				// mainan();
			// });
			// console.log(p.data)
		})
		.catch((e) => {
			console.log(e);
			console.log(process.exit(22))
		});

	// try {
	//     inquirer.prompt([{type:"input",name:"apikey",message:"please input your api key !"}])
	//         .then(p=>{
	//             axios.post("http://127.0.0.1:8000/api/cobasaja",{key:p.apikey})
	//                 .then(p =>{
	//                      console.log("welcome to the sender "+p.data.name)
	//                     })
	//                 .catch(e =>{
	//                      console.log(e.response.data[0])

	//                     })
	//         }).catch(e=>console.log(e))

	// } catch (error) {
	//     console.log(error)
	// }
}

main();
