const path = require('path');
const express = require("express")
const cors = require('cors');
const http = require('http');

const instrument = require('@socket.io/admin-ui')

const app = express()
app.use(cors());

const server = http.createServer(app)

const io = require('socket.io')(server, {
    serveClient: false })

const db = require('./config/keys')

const mongoose = require('mongoose')

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log("mongo connection error: ", err.message));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
} else {
    app.get('/', (req, res) => { return res.send("hello world from express")})
}

const bodyParser = require('body-parser')
const game = require("./routes/api/game");

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use("/api/game", game);


const port = process.env.PORT || 5000

//helping functions for WS events
function removeArrayItem(arr, item) {
    for (var i = arr.length; i--;) {
        if (arr[i] === item) arr.splice(i, 1);
    }
}



io.on("connection", socket => {
    console.log('you are connected on the backend to: ', socket.id)
    console.log('방들: ', socket.rooms)

    socket.onAny(event => {
        console.log('socket event: ', event)
    })


    socket.on("role", (role) => {
        console.log("socket.role: ", role)
        socket.role = role
        console.log("socket.role: ", socket.role)
    })

    //메세지와 동시에 펑션을 'done'을 받아서 실행할수 있음.
    socket.on("enter_room", (msg, done) => {
        let room = io.sockets.adapter.rooms.get('room1')
        
        if (room === undefined || room.size < 5) {
            socket.join('room1')
            socket.to('room1').emit('welcome')
            room && console.log("몇: ", room.size)
            console.log("방들: ", socket.rooms)
            room &&  console.log("몇: ", room.size)
            console.log("사람들: ", io.sockets.adapter.rooms.get('room1').size)

        } else {
            socket.join('room2')
            socket.to('room2').emit('welcome')
            console.log("사람들: ", io.sockets.adapter.rooms.get('room1').size)
            console.log('room2 size: ', io.sockets.adapter.rooms.get('room2').size)

        }
        console.log("사람들: ", io.sockets.adapter.rooms.get('room1').size)
        console.log('msg: ', msg)
    })

    socket.on("disconnecting", () => {
        socket.to('room2').emit('leaving')
        console.log("someone leaving the room")
 
        // socket.rooms.forEach(room => {
        //     socket.to(room).emit('leaving')
        //     io.sockets.adapter.rooms.get('room2') && console.log('room2 size: ', io.sockets.adapter.rooms.get('room2').size)
        // })
    })

    socket.on("disconnect", () => {
        socket.to('room2').emit('left')
        console.log("someone left the room")

        // io.sockets.emit('left', () => { console.log('bye bye')})
        // console.log('room2 size: ', io.sockets.adapter.rooms.get('room2').size)
    })
})

server.listen(port, () => console.log(`Server is running on the port ${port}, from express server`))
