// const express = require('express')
// const app = express()
// const port = 3000
// const dotenv = require('dotenv');

import { TaskManager } from './classes/TaskManager.mjs';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
const port = 3001;
const app = express();
import { ApiRoutes } from './routes/ApiRoutes.js';

const taskManager = new TaskManager();
taskManager.loadFromFile();
dotenv.config();


// enable cors from all same-origin domains
app.use(cors({
    origin: ['http://localhost:3000', "http://localhost:3001"]
}));

app.use('/api', ApiRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// create group to catch all api routes

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})