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

router.put('/tasks/:id/title', (req, res) => {
    let taskId = req.params.id;
    let json = req.body;
    let taskManager = new TaskManager();
    taskManager.loadFromFile();
    let theTask = taskManager.getTaskById(taskId);
    theTask.title = json.title;
    taskManager.saveToFile();
    res.json({ success: true });
});

// module.exports = router
// export as ApiRoutes
export { router as ApiRoutes };