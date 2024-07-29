const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/forum', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

const PostSchema = new mongoose.Schema({
  title: String,
  body: String,
  userId: String
});

const User = mongoose.model('User', UserSchema);
const Post = mongoose.model('Post', PostSchema);

app.post('/api/auth/register', (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });
  newUser.save().then(user => res.json(user));
});

app.post('/api/auth/login', (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      return res.status(404).send('User not found');
    }
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ auth: false, token: null });
    }
    const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: 86400 });
    res.status(200).send({ auth: true, token: token, user: user });
  });
});

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }
  jwt.verify(token.split(' ')[1], 'secret', (err, decoded) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }
    req.userId = decoded.id;
    next();
  });
};

app.get('/api/posts', (req, res) => {
  Post.find().then(posts => res.json(posts));
});

app.post('/api/posts', verifyToken, (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    body: req.body.body,
    userId: req.userId
  });
  newPost.save().then(post => {
    console.log('New post created:', post);
    io.emit('newPost', post); // Emitir evento de nuevo post
    res.json(post);
  });
});

app.delete('/api/posts/:id', verifyToken, (req, res) => {
  Post.findByIdAndDelete(req.params.id).then(() => {
    console.log('Post deleted:', req.params.id);
    io.emit('deletePost', req.params.id); // Emitir evento de eliminación de post
    res.json({ success: true });
  });
});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
