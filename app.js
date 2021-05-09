// imports
const express = require('express')
var nodemailer = require('nodemailer');
require('dotenv').config();

const app = express()
const port = 3000


//Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/assets', express.static(__dirname + 'public/assets'))

app.use(express.json())
const urlencodedParser = express.urlencoded({extended: false})

//Set views
app.set('views', './views')
app.set('view engine', 'ejs')

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        //FIX THIS LATER TO NOT SHOW USERNAME AND PASSWORD TO EVERYONE
        user: `${process.env.USER}`,
        pass: `${process.env.PASS}`
    }
});


app.get('', (req, res) => {
    res.render('index')
})

app.get('/contact', (req, res) => {
    res.render('contact')
})
app.get('/aboutMe', (req, res) => {
    res.render('aboutMe')
})
app.get('/resume', (req, res) => {
    res.render('resume')
})


//Runs when you press send on contact page
//Contact page has a form which is linked with /contactForm route 
//because action="/contactForm" and method="POST"
//and then we have email sending code within the post listener (so it only sends when you post the form using button)
app.post("/contactForm", urlencodedParser, (req, res)=> {
    const {body} = req;
    const name = body.Name;
    const email = body.Email;
    const message = body.message;
   

    //HIS CODE in here
    //THIs code sends email

var mailOptions = {
    from: 'nidhicontactpage@gmail.com',
    to: 'nidhicontactpage@gmail.com',
    subject:  'Contact from: ' + name,
    text: 'Email: ' + email + '\n' + 'Message: ' + message
};

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
    } else{
        console.log('Email sent: ' + info.response);
    }
});

})








//Lissten on port 3000
app.listen(port, () => console.info(`Listening on port ${port}`))