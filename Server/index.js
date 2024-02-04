const express = require('express');
const app = express();

const userRoutes = require('./routes/User');
const ProfileRoutes = require('./routes/Profile');
const paymentRoutes = require('./routes/Payments');
const courseRoutes = require('./routes/Course');

const database = require('./config/database');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const {cloudinaryConnect} = require('./config/cloudinary');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 4000;

// db connection
database();

// middlewares
app.use(express.json());
app.use(cookieParser());
// app.use(
//     cors({
//         origin:"https://study-notion-hosting-frontend-5o7e1odqe.vercel.app/",
//         credentials:true
//     })

  
  

// );

// app.use((req, res, next) => {
//   //res.header('Access-Control-Allow-Origin', 'https://study-notion-hosting-frontend-cb61fas2o.vercel.app');
//   res.header('Access-Control-Allow-Origin', 'https://study-notion-hosting-f-git-e9c595-jatin-ranas-projects-f3e8c072.vercel.app/');
 
//   https://study-notion-hosting-frontend-cb61fas2o.vercel.app/
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'https://study-notion-hosting-f-git-e9c595-jatin-ranas-projects-f3e8c072.vercel.app');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.header('Access-Control-Allow-Credentials', 'true');

//   if (req.method === 'OPTIONS') {
//     return res.sendStatus(200);
//   }

//   next();
// });






// List of allowed origins
const allowedOrigins = [
  'https://study-notion-hosting-frontend-theta.vercel.app/',
  'https://study-notion-hosting-f-git-e9c595-jatin-ranas-projects-f3e8c072.vercel.app/',
  'https://study-notion-hosting-frontend-jqhqym8ua.vercel.app/'
  // Add more origins as needed
];

// Add this middleware to handle CORS
app.use((req, res, next) => {
  const origin = req.headers.origin;

  // Check if the request origin is in the allowedOrigins array
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
  }

  next();
});












app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp"
}));

// cloudinary connection
cloudinaryConnect();

// routes
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",ProfileRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/payment",paymentRoutes);

// default route
app.get("/",(req,res)=>
{
    return res.json(
        {
            success:true,
            message:"Your Server is up and Running..."
        })
});

app.listen(PORT,()=>
{
    console.log("App is Running at Port No ",PORT);
});
