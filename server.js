const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine' , 'hbs');


app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err)=>{
        if(err){
            console.log('unable to appned the file');
        }
    });
    next();
})
// app.use((req,res,next)=>{
//     res.render('maintainance.hbs',{
//         pageTitle: 'Under Maintainance',
//         pageText: 'We will be right back shortly.'
//     })
// })

app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear' , ()=>{
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt' ,(text)=>{
    return text.toUpperCase();
})

app.get('/', (req,res)=> {
    // res.send('server is accessed');
    //  res.send('<h1>server is accessed</h1>');
    // res.send({
    //     Name: 'Qalib Abbas',
    //     Courses: ['Web','App']
    // });
    res.render('home.hbs' , {
        pageTitle: 'HomePage',
        pageText: 'Welcome to Website',
    })
});
app.get('/about' , (req,res)=>{
    res.render('about.hbs',{
        pageTitle: 'About Page',
    })
})
app.get('/bad' , (req,res)=>{
    res.send({
        errorMessage: 'Unable to load Page',
        statusCode: '404'
    })
})
app.listen(3000, ()=>{
    console.log('server is up on port 3000');
});