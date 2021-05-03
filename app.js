// imports
const express = require('express')
const app = express()
const port = 3000

//Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/assets', express.static(__dirname + 'public/assets'))

//Set views
app.set('views', './views')
app.set('view engine', 'ejs')



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









//Lissten on port 3000
app.listen(port, () => console.info(`Listening on port ${port}`))