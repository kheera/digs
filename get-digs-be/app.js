import { TaskManager } from './src/classes/TaskManager.mjs';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
const port = 3001;
const app = express();
import { ApiRoutes } from './src/routes/ApiRoutes.js';
dotenv.config({ path: path.resolve(process.cwd(), '../.env') });
const taskManager = new TaskManager();
taskManager.loadFromFile();


// enable cors from all same-origin domains
app.use(cors({
    origin: ['http://localhost:3000', "http://localhost:3001"]
}));

app.use((req, res, next) => {
    console.log('Request received', req.url);
    next();
});

app.use('/api', ApiRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// create group to catch all api routes

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})