import express from 'express';
import { PORT } from './config/env.js';
import notesRouter from './routes/notes.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/v1/notes', notesRouter);

app.use(errorMiddleware);

app.listen(PORT, async () => {
    console.log(`Notes API is running on http://localhost:${PORT}`);

    await connectToDatabase();     
});

export default app;