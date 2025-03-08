const express = require('express');
const mongoose = require('mongoose');
const marketRoutes = require('./router/market');
const creditRoutes = require('./router/creditRoutes');
const producerRouter = require('./router/producerRouter');
const consumerRouter = require('./router/consumerRouter');
const cors = require('cors')
const app = express();

const monogURI = "mongodb+srv://adithyanrlal:B5XHO56OPDiQ5CkV@cluster0.cg9xy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.method, req.url, req.body);
    next();
});
app.use('/api/credits', creditRoutes);
app.use('/api/producer', producerRouter)
app.use('/api/consumer', consumerRouter)
app.use('/market', marketRoutes);

mongoose.connect(monogURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
        app.listen(3000, () => console.log('Server running on http://localhost:3000'));
    })
    .catch((err) => console.error('DB connection error:', err));
