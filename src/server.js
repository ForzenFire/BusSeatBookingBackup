const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = require('../docs/swaggerDefinition');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

const options = {
    swaggerDefinition,
    apis: ['./controller/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

const routeRoutes = require('./controller/routes/route');
const driverRoutes = require('./controller/routes/driver');
const busRoutes = require('./controller/routes/bus');
const conductorRoutes = require('./controller/routes/conductor');
const busScheduleRoutes = require('./controller/routes/busSchedule');
const authRoutes = require('./controller/routes/auth');
const reservationRoutes = require('./controller/routes/reservation');
const { cleanupExpiredHolds } = require('./controller/api/reservationController');

app.use('/api/routes', routeRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/buses', busRoutes);
app.use('/api/schedule', busScheduleRoutes);
app.use('/api/conductor', conductorRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// app.use('/*', (req, res) => res.status(404).send("Endpoint not found"));

app.get('/', (req, res) => {
    res.send('Welcome! Server is running');
});

// setInterval(() => {
//     cleanupExpiredHolds();
// }, 10*60*1000 );

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('Mongo DB Connection Error:', err));

const PORT = process.env.PORT || 80;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));