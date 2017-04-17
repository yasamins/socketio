'use strict'


const express = require('express');
const app = express();
app.use(express.static('public'));


app.get('/', (req, res) => {
  if(req.user !== undefined)
    return res.send(`Hello ${req.user.username}!`);
  res.send('Hello Secure World!');
});

app.listen(3000);
