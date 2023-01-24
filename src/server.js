const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const { translate } = require('bing-translate-api');


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

console.log("tucson")

// Define a route that listens to POST requests on the path '/submit'
app.post("/submit", (req, res) => {
    // Get the user's input from the request body
    const {string} = req.body;
    console.log(string); // this should log the string written by user

    // Do something with the user's input 
    //...

    // Send a response back to the client
    res.json({message: 'Thanks for your input!'});
});


translate('你好', null, 'en', true).then(res => {
  console.log(res.translation);
}).catch(err => {
  console.error(err);
})