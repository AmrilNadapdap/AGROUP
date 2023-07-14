const express = require('express');
const app = express();
const port = 3000;

// Middleware untuk mengizinkan parsing body pada request
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => {
  // Cek status login pengguna
  const isLoggedIn = req.session.isLoggedIn || false;

  // Redirect pengguna ke halaman login jika belum login
  if (!isLoggedIn) {
    return res.redirect('/login');
  }

  // Tampilkan halaman index
  res.send('<h1>Welcome to the Home Page</h1>');
});

app.get('/login', (req, res) => {
  res.send(`
    <h1>Login</h1>
    <form action="/login" method="post">
      <input type="email" name="email" placeholder="Email">
      <input type="password" name="password" placeholder="Password">
      <button type="submit">Login</button>
    </form>
  `);
});

app.post('/login', (req, res) => {
  // Lakukan proses autentikasi di sini
  // Misalnya, periksa kredensial pengguna dari request body
  const { email, password } = req.body;
  // Contoh sederhana: jika email dan password cocok, set isLoggedIn ke true
  if (email === 'user@example.com' && password === 'password') {
    req.session.isLoggedIn = true;
    return res.redirect('/');
  }

  // Jika autentikasi gagal, tampilkan pesan error atau redirect ke halaman login kembali
  res.send('Invalid email or password');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
