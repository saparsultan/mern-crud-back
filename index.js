const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const FriendModel = require('./models/Friends');
const connectDB = require('./db-path');
require('dotenv').config();

app.use(cors());
app.use(express.json());


mongoose.connect(connectDB, { useNewUrlParser: true})

app.post('/addfriend', async (req, res) => {
  const name = req.body.name;
  const age = req.body.age;

  const friend = new FriendModel({name: name, age: age});
  await friend.save();
  res.send(friend)
})

app.get('/read', async (req, res) => {
  FriendModel.find({}, (err, result) => {
    if(err) {
      res.send(err);
    } else {
      res.send(result)
    }
  })
})

app.put('/update', async (req, res) => {
  const newAge = req.body.newAge;
  const id = req.body.id;

  try {
    await FriendModel.findById(id, (err, friendToUpdate) => {
      friendToUpdate.age = +newAge;
      friendToUpdate.save();
    });
  } catch (err) {
    console.log(err)
  }
  res.send('Updated')
})

app.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;

  try {
    await FriendModel.findByIdAndRemove(id).exec();
  } catch (err) {
    console.log(err)
  }
  res.send('Item deleted')
})

app.listen(process.env.PORT || 3001, () => {
  console.log('server run');
})