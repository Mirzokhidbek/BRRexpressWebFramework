console.log("Web server is running");
const express = require("express");
const app = express();
const http = require("http");
const PORT = 3000;

//start code
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//session code
//views code
app.set("views", "views");
app.set("view engine", "ejs");

//Routing code
app.get("/", (req, res) => {  
    res.end(`
  <!DOCTYPE html>
  <html lang="uz">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Home Page</title>
      <style>
          * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }
          body {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              height: 100vh;
              display: flex;
              justify-content: center;
              align-items: center;
          }
          .container {
              background: rgba(255, 255, 255, 0.1);
              backdrop-filter: blur(12px);
              -webkit-backdrop-filter: blur(12px);
              border: 1px solid rgba(255, 255, 255, 0.2);
              padding: 40px;
              border-radius: 20px;
              box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
              text-align: center;
              max-width: 400px;
              width: 90%;
          }
          h1 {
              color: #ffffff;
              margin-bottom: 25px;
              font-size: 24px;
              letter-spacing: 0.5px;
          }
          .nav-links {
              display: flex;
              flex-direction: column;
              gap: 12px;
          }
          .nav-links a {
              text-decoration: none;
              color: #ffffff;
              background: rgba(255, 255, 255, 0.15);
              padding: 12px 20px;
              border-radius: 10px;
              font-weight: 500;
              transition: all 0.3s ease;
              border: 1px solid rgba(255, 255, 255, 0.1);
          }
          .nav-links a:hover {
              background: #ffffff;
              color: #764ba2;
              transform: translateY(-2px);
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h1>Welcome to the Home Page</h1>
          <div class="nav-links">
              <a href="/about">About</a>
              <a href="/contact">Contact</a>
              <a href="/login">Login</a>
              <a href="/register">Register</a>
              <a href="/dashboard">Dashboard</a>
              <a href="/logout">Logout</a>
          </div>
      </div>
  </body>
  </html>
`);
});
app.get('/about', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="uz">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>About Page</title>
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
                body { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); height: 100vh; display: flex; justify-content: center; align-items: center; }
                .container { background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.2); padding: 40px; border-radius: 20px; box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37); text-align: center; max-width: 400px; width: 90%; }
                h1 { color: #ffffff; margin-bottom: 20px; font-size: 26px; }
                p { color: #f0f0f0; margin-bottom: 25px; font-size: 15px; line-height: 1.6; }
                .back-btn { text-decoration: none; color: #ffffff; background: rgba(255, 255, 255, 0.15); padding: 10px 20px; border-radius: 10px; font-weight: 500; transition: all 0.3s ease; border: 1px solid rgba(255, 255, 255, 0.1); display: inline-block; }
                .back-btn:hover { background: #ffffff; color: #764ba2; transform: translateY(-2px); box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>About Us</h1>
                <p>Bu sahifa bizning loyihamiz va jamoamiz haqida batafsil ma'lumot berish uchun mo'ljallangan zamonaviy web sahifa.</p>
                <a href="/" class="back-btn">Bosh sahifaga qaytish</a>
            </div>
        </body>
        </html>
    `);
});
const server =  http.createServer(app);
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});