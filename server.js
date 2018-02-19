var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);
var io = require ('socket.io')(http);
var mongoose = require('mongoose')

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var dbURl = 'mongodb://admin:admin@ds235778.mlab.com:35778/chitchat-node' //config file

var Message = mongoose.model('Message',{
    name: String,
    message: String
})


// var messages =[   this is for tests of the message display area
//
//     {name: 'Stevie', message: 'wud up playa playa'},
//     {name: 'Vitt', message: 'not much sucka'},
//     {name: 'Sashman', message: 'How you feeling'},
//     {name: 'Doomer\'s Revenge', message: 'like a sweet onion maaan!!!'}
// ]



app.get('/messages', (req, res) =>{
    Message.find({}, (err, messages)=>{
        res.send(messages)

    })


})

app.post('/messages', (req, res) =>{
   // console.log(req.body)    console test
    var message = new Message(req.body)
    message.save((err) => {
        if (err)
            sendStatus(500)
        //check for bad words inside database
        Message.findOne({message:'badword'}, (err, censored)=>{
            if(censored){
                console.log('censored word found', censored)
                Message.remove({_id: censored.id}, (err)=>{
                    console.log('removed censored message')
                })
            }
        })

        // messages.push(req.body)
        io.emit('message', req.body)
        res.sendStatus(200)
    })
})

io.on('connection', (socket) => {
    console.log('New User connected')
})
mongoose.connect(dbURl, (err)=> {
    console.log('mongo db connection', err)
})

var server = http.listen(3006, () => {

    console.log('server is listening on port', server.address().port)

})