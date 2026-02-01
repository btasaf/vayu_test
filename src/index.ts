import 'dotenv/config';
import express from 'express';
import sequelize from './config/database';
import { loadRoutes } from './routes';
import { errorHandler } from './middleware';
import './models';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

loadRoutes(app);

app.use(errorHandler);

async function start() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');

    await sequelize.sync({ alter: true });
    console.log('Models synchronized');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();
