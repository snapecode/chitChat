var express = require('express');
var bodyParser = require('body-parser')
var app = express();



app.use(express.static(__dirname));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


var messages =[

    {name: 'Stevie', message: 'wud up playa playa'},
    {name: 'Vitt', message: 'not much susucka'},
    {name: 'Sashman', message: 'How you feeling'},
    {name: 'Doomer\'s Revenge', message: 'like a sweet onion maaan!!!'}
]



app.get('/messages', (req, res) =>{
    res.send(messages)

})

app.post('/messages', (req, res) =>{
   // console.log(req.body)    console test
    messages.push(req.body)
    res.sendStatus(200)

})


var server = app.listen(3005, () =>{

    console.log('server is listening on port', server.address().port)

});
