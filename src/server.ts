import express from 'express';
import dotenv from 'dotenv';
import UserRoutes from './routes/user.routes';
import { errorHandler } from './middlewares/errorHandler';
import { setupSwagger } from './config/swagger';

dotenv.config();

const app = express();
app.use(express.json());

setupSwagger(app);

app.use('/api/users', UserRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
});

