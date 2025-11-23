const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const empRoutes = require('./routes/employee.routes');
const errorHandler = require('./middlewares/errorHandler');
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Setting Security Middlewares
app.use(helmet());
app.use(hpp());
app.use(cors());

// setting max 100 requests per IP,  15 min window
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});
app.use(limiter);

// parsing payload
app.use(express.json());
app.use('/api', authMiddleware, empRoutes);

// global error handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});