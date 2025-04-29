const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const fileupload = require('express-fileupload');
const nodemailer = require('nodemailer');


//Custome Plugins
const config = require("./services/app.service");
const adminRouter = require("./routes/admin.router");
// end 
app.use(fileupload());
//ejs Plugin 
app.engine('html', require('ejs').renderFile);
// end
app.use(express.json({ limit: '25mb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/storage', express.static(__dirname + '/storage'));

//User Routes
app.use("/api/admin", adminRouter);

//ng serve --host 0.0.0.0 --port 4200
// simple route
app.get("/",async (_req, res) => {
  // transporter setup
  //  try {
  //        let transporter = nodemailer.createTransport({
  //            service: 'gmail',
  //            host: "smtp.gmail.com",
  //            port: 465,
  //            secure: true,
  //            auth: {
  //                user: 'rupeshpantawane62@gmail.com', // Your Gmail email address rj.surya1999@gmail.com
  //                pass: 'dufq qdzu rgmv przr' // Your Gmail password
  //            }
  //        });
  //        let mailOptions = {
  //            from: 'rupeshpantawane62@gmail.com', // Sender address
  //            to: 'rupeshpantawane62@gmail.com', // List of recipients
  //            subject: 'otp testing', // Subject line
  //            text: 'your otp is 11111' // Plain text body
  //        };
  //        transporter.sendMail(mailOptions, (error, info) => {
  //            if (error) {
  //                console.log('Error occurred:', error.stack);
  //            } else {
  //                console.log('Email sent:', info.response);
  //            }
  //        });
   
  //    } catch (error) {
  //        return ReE(res, { message: "Somthing Went Wrong", err: error }, 200);
  //    }
  res.json({ message: "server working..." });
});

const PORT = process.env.PORT || config["port"];
let server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
