const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
// const session = require('express-session');
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { oauth2 } = require('googleapis/build/src/apis/oauth2');

// Load Express to out app
const app = express();
const port = 80;

// Start MongoD in Powershell and connect it to our localhost
// mongoose.connect("mongodb://localhost:27017/ContactDataDB", {
//     useUnifiedTopology: true,
//     useNewUrlParser: true
// });

// // If connection is successfull display some message
// var db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function () {
//     console.log("Connection Successful!");
// });

// // Create an Schema for the Database
// const contactSchema = new mongoose.Schema({
//     name: String,
//     contact: String,
//     email: String,
//     message: String
// });

// // Compile that Schema into Model
// const Contact = mongoose.model('Contact', contactSchema, 'contactMessages');

// Define Static
app.use('/static', express.static('static'));


// TO access form values we require these
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const CLIENT_ID = "522294355068-qc9qmd4mh2468inklp28279beusdqo57.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = "1//04sxUpi8ajhwDCgYIARAAGAQSNwF-L9IrKSFPCJK74Mctfh3_P0T_wsKH5YYsV8kCMvf0WZOk-pDVT_70U00lm0IGfiM6c9Ozi-E";

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })


app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'views/index.html'))
});

app.get('/home', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'views/index.html'))
});

app.get('/groceries', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'views/groceries.html'))
});

app.get('/fruits', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'views/fruits.html'))
});

app.get('/vegetables', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'views/vegetables.html'))
});

app.get('/contact', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'views/index.html'))
});

app.get('/signup', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'views/signup.html'))
});

app.get('/payment', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'views/payment-form.html'))
});

app.post('/contact', (req, res) => {
    var data = new Contact(req.body);
    data.save();

    // Define Mail Info
    const accessToken = oAuth2Client.getAccessToken()
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: `${req.body.email}`,
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken
        }
    });

    // Data of Mail to be sent
    message = {
        from: `${req.body.email}`,
        to: "2019bcs035@sggs.ac.in, 2019bcs077@sggs.ac.in, 2019bcs118@sggs.ac.in",
        subject: `MyOnlineVegies feedback by ${req.body.name}`,
        text: `Message : ${req.body.message} \nContact Number : ${req.body.contact} \nfrom : ${req.body.email}`
    };

    // Sending the Mail
    transport.sendMail(message);
});

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});
