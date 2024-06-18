import express from 'express'
const router = express.Router()
import { TaskManager } from '../classes/TaskManager.mjs';


// api json routes
router.use(express.json( { limit: '10mb'}));

// api routes to get a list of tasks
router.get('/tasks', (req, res) => {
    let taskManager = new TaskManager();
    taskManager.loadFromFile();
    // send json response
    res.json(taskManager.getTasks());
})

// api routes to add a new task
router.post('/tasks', (req, res) => {
    let json = req.body;
    let taskManager = new TaskManager();
    taskManager.loadFromFile();
    console.log("Adding task", json);
    taskManager.addTask(json);
    taskManager.saveToFile();
    res.json(taskManager.getTasks());
})

let taskRouter = express.Router({ mergeParams: true });
taskRouter.get('/', (req, res) => {
    let taskId = req.params.id;
    let taskManager = new TaskManager();
    taskManager.loadFromFile();
    let theTask = taskManager.getTaskById(taskId);
    if (theTask) {
        res.json(theTask);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
})

taskRouter.put('/title', (req, res) => {
    let taskId = req.params.id;
    let json = req.body;
    let taskManager = new TaskManager();
    taskManager.loadFromFile();
    let theTask = taskManager.getTaskById(taskId);
    theTask.title = json.title;
    taskManager.saveToFile();
    res.json({ success: true });
})

// start a timer
taskRouter.post('/timer', (req, res) => {
    let taskId = req.params.id;
    let json = req.body;
    let taskManager = new TaskManager();
    taskManager.loadFromFile();
    let theTask = taskManager.getTaskById(taskId);
    theTask.startTimer(json.startTime);
    taskManager.saveToFile();
    res.json({ timers: theTask.timers });
})

// update timer
taskRouter.put('/timer/:timerId', (req, res) => {
    console.log("Params ... ", req.params);
    let taskId = req.params.id;
    let timerId = req.params.timerId;
    let updatedTimer = req.body;
    let taskManager = new TaskManager();
    taskManager.loadFromFile();
    let theTask = taskManager.getTaskById(taskId);
    theTask.updateTimer(timerId, updatedTimer);
    taskManager.saveToFile();
    res.json({ timers: theTask.timers });
})

// delete timer
taskRouter.delete('/timer/:timerId', (req, res) => {
    let taskId = req.params.id;
    let timerId = req.params.timerId;
    let taskManager = new TaskManager();
    taskManager.loadFromFile();
    let theTask = taskManager.getTaskById(taskId);
    theTask.deleteTimer(timerId);
    taskManager.saveToFile();
    res.json({ timers: theTask.timers });
})

router.use('/task/:id', taskRouter);
// module.exports = router
// export as ApiRoutes
export { router as ApiRoutes };