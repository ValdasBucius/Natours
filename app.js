const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// 1) Middlewares
app.use(morgan('dev'));

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

app.use((req, res, next) => {
  console.log('Hello from the middleware🤵');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

const port = 8000;
app.listen(port, () => {
  console.log(`App runing on ${port}...`);
});
