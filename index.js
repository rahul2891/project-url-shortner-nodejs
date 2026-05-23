import 'dotenv/config';
import express from 'express';
import userRoutes from './routes/user.routes.js';
import { authenticationMiddleware } from './middlewares/auth.middleware.js';
import urlRoutes from './routes/url.routes.js';


const app = express();

app.use(express.json());
app.use(authenticationMiddleware);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/user', userRoutes);
app.use(urlRoutes);

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});