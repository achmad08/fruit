const nodemailer = require('nodemailer');


(async()=>{
    let transporter = nodemailer.createTransport({
        host: "secure.emailsrvr.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "mosiour.rahman@olympicbd.com", // generated ethereal user
            pass: "Mosiour7891", // generated ethereal password
        },
    });

   

})();