const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const hpp = require('hpp');

const DataAccess = require('./core/DataAccess');
const app = express();
const PORT = process.env.PORT || 3000;

// Setting Security Middlewares
app.use(helmet());
app.use(hpp());
app.use(cors());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 100, // requests per IP
});
app.use(limiter);

// parsing payload
app.use(express.json());

app.post('/api/GetEmpStatus', async(req, res) => {
    try {
        const { nationalNumber } = req.body;
        const user = await DataAccess.getUserWithSalaries(nationalNumber);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});