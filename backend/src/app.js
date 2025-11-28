const express = require('express');
const cors = require('cors');
const connectDB = require('./Database/connection');
const dotenv = require('dotenv').config();
const { clerkMiddleware } = require("@clerk/express")
const fileUpload = require("express-fileupload")
const path = require("path");

// const __dirname = path.resolve();
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.use(clerkMiddleware()) // ! this will add auth to req obj => req.auth
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: path.join(__dirname, "tmp"),
		createParentPath: true,
		limits: {
			fileSize: 10 * 1024 * 1024, // 10MB  max file size
		},
	})
);

app.use('/api/users', require('./routes/user.route'));
app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/songs', require('./routes/songs.route'));
app.use('/api/admin', require('./routes/admin.route'));
app.use('/api/albums', require('./routes/album.route'));
app.use('/api/stats', require('./routes/stats.route'));


// Error Handler
app.use((err,req,res,next)=>{
  console.log();
  res.status(500).json({
    message: process.env.NODE_ENV === "production" ? "Internal Server Error" : err.message
  })
})




app.get('/', (req, res) => {
  res.send('API is running...');
});



app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
