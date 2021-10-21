const express = require('express');
const app = express();
const cors = require('cors'); //CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
const port =  5000;

app.use(cors()); // middleware
app.use(express.json());

const users = [
    {id:0, name:"aunik", gmail: "aunik@gmail.com"},
    {id:1, name:"shanto", gmail: "shanto@gmail.com"},
    {id:2, name:"badhon", gmail: "badhon@gmail.com"},
    {id:3, name:"nabid", gmail: "mabid@gmail.com"},
];

// app.get ('/users', (req, res)=>{
//     res.send(users);
// })

//Use Query Parameter for searching (http://localhost:5000/users?search=....)
app.get ("/users", (req, res) =>{
    const search = req.query.search;
    if(search){
        const searchResult = users.filter(user => user.name.toLocaleLowerCase().includes(search));
        res.send(searchResult);
    }
    else{
        res.send(users);
    }
});



//Dynamic APIs
app.get ('/users/:id', (req, res) =>{
    const id =(req.params.id);
    const user = users[id];

    res.send(user);
});

//app.method //data ar akjon disse tai post
app.post('/users', (req, res)=>{
    const newUser = req.body;
    newUser.id = users.length;
    users.push(newUser);
    console.log('hitting the post', req.body);
    // res.send(JSON.stringify(newUser));
    res.json(newUser)
})

// short from 
app.get('/',(req, res) =>{   
    res.send('Hello, I am learning node and starting nodemon');
})

app.listen(port, () =>{
    console.log("listening to port", port);
});