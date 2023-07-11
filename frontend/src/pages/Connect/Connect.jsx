// Required libraries and dependencies
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

// Create the express app
const app = express();

// Set up the middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'your-secret-key',
  resave: true,
  saveUninitialized: true
}));

// Mocked data for testing
const users = [
  { id: 1, username: 'user1', password: 'password1', friends: [] },
  { id: 2, username: 'user2', password: 'password2', friends: [] }
];

const posts = [
  { id: 1, userId: 1, text: 'First post', likes: 0 },
  { id: 2, userId: 2, text: 'Second post', likes: 0 }
];

// Routes
app.get('/', (req, res) => {
  // Check if the user is logged in
  if (req.session.loggedIn) {
    res.send(`
      <h1>Welcome ${req.session.username}!</h1>
      <a href="/logout">Logout</a>
      <hr>
      <h2>Create a Post</h2>
      <form action="/posts" method="post">
        <input type="text" name="text" placeholder="Enter your post" required>
        <button type="submit">Submit</button>
      </form>
      <hr>
      <h2>Posts</h2>
      ${posts.map(post => `
        <div>
          <p>${post.text}</p>
          <p>Likes: ${post.likes}</p>
          <button onclick="likePost(${post.id})">Like</button>
          <button onclick="unlikePost(${post.id})">Unlike</button>
        </div>
      `).join('')}
    `);
  } else {
    res.send(`
      <h1>Welcome to the Social Media Community!</h1>
      <a href="/login">Login</a> |
      <a href="/register">Register</a>
    `);
  }
});

// Login route
app.get('/login', (req, res) => {
  res.send(`
    <h2>Login</h2>
    <form action="/login" method="post">
      <input type="text" name="username" placeholder="Username" required>
      <input type="password" name="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
  `);
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    req.session.loggedIn = true;
    req.session.username = user.username;
    res.redirect('/');
  } else {
    res.send('Invalid username or password');
  }
});

// Logout route
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// Register route
app.get('/register', (req, res) => {
  res.send(`
    <h2>Register</h2>
    <form action="/register" method="post">
      <input type="text" name="username" placeholder="Username" required>
      <input type="password" name="password" placeholder="Password" required>
      <button type="submit">Register</button>
    </form>
  `);
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const user = { id: users.length + 1, username, password, friends: [] };
  users.push(user);

  req.session.loggedIn = true;
  req.session.username = user.username;
  res.redirect('/');
});

// Create a post
app.post('/posts', (req, res) => {
  if (!req.session.loggedIn) {
    res.send('Please login to create a post');
    return;
  }

  const { text } = req.body;
  const post = { id: posts.length + 1, userId: req.session.userId, text, likes: 0 };
  posts.push(post);
  res.redirect('/');
});

// Like a post
app.post('/posts/:postId/like', (req, res) => {
  if (!req.session.loggedIn) {
    res.send('Please login to like a post');
    return;
  }

  const postId = parseInt(req.params.postId);
  const post = posts.find(p => p.id === postId);

  if (post) {
    post.likes++;
    res.redirect('/');
  } else {
    res.send('Post not found');
  }
});

// Unlike a post
app.post('/posts/:postId/unlike', (req, res) => {
  if (!req.session.loggedIn) {
    res.send('Please login to unlike a post');
    return;
  }

  const postId = parseInt(req.params.postId);
  const post = posts.find(p => p.id === postId);

  if (post) {
    if (post.likes > 0) {
      post.likes--;
    }
    res.redirect('/');
  } else {
    res.send('Post not found');
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
