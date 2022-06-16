const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const path = require('path');
const morgan = require('morgan');

const connectDB = require('./config/db.js');
const productRoute = require('./routes/productRoutes.js');
const userRoute = require('./routes/userRoutes.js');
const orderRoute = require('./routes/orderRoutes.js');
const uploadRoute = require('./routes/uploadRoutes.js');
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js');

const PORT = process.env.PORT || 5000;

// connect to database
connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('API is running...');
// });

app.use('/api/products', productRoute);
app.use('/api/users', userRoute);
app.use('/api/orders', orderRoute);
app.use('/api/upload', uploadRoute);

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// prepare for production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.use(notFound);

app.use(errorHandler);

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
);
