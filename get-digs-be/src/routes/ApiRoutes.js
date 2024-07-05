import express from 'express'
const router = express.Router()
import { ProjectManager } from '../classes/ProjectManager.mjs';


// api json routes
router.use(express.json( { limit: '10mb'}));

// api routes to get a list of projects
router.get('/projects', (req, res) => {
    let projectManager = new ProjectManager();
    projectManager.loadFromFile();
    // send json response
    res.json(projectManager.getProjects());
})

// api routes to add a new project
router.post('/projects', (req, res) => {
    let json = req.body;
    let projectManager = new ProjectManager();
    projectManager.loadFromFile();
    console.log("Adding project", json);
    projectManager.addProject(json);
    projectManager.saveToFile();
    res.json(projectManager.getProjects());
})

// api routes to delete a project
router.delete('/project/:id', (req, res) => {
    let projectId = req.params.id;
    let projectManager = new ProjectManager();
    projectManager.loadFromFile();
    projectManager.deleteProject(projectId);
    projectManager.saveToFile();
    res.json(projectManager.getProjects());
})

let projectRouter = express.Router({ mergeParams: true });
projectRouter.get('/', (req, res) => {
    let projectId = req.params.id;
    let projectManager = new ProjectManager();
    projectManager.loadFromFile();
    let theProject = projectManager.getProjectById(projectId);
    if (theProject) {
        res.json(theProject);
    } else {
        res.status(404).json({ message: 'Project not found' });
    }
})

projectRouter.put('/title', (req, res) => {
    let projectId = req.params.id;
    let json = req.body;
    let projectManager = new ProjectManager();
    projectManager.loadFromFile();
    let theProject = projectManager.getProjectById(projectId);
    theProject.title = json.title;
    projectManager.saveToFile();
    res.json({ success: true });
})

// add a goal
projectRouter.post('/goal', (req, res) => {
    let projectId = req.params.id;
    let json = req.body;
    let projectManager = new ProjectManager();
    projectManager.loadFromFile();
    let theProject = projectManager.getProjectById(projectId);
    theProject.addGoal(json.description);
    projectManager.saveToFile();
    res.json({ goals: theProject.goals });
})

// start a timer
projectRouter.post('/timer', (req, res) => {
    let projectId = req.params.id;
    let json = req.body;
    let projectManager = new ProjectManager();
    projectManager.loadFromFile();
    let theProject = projectManager.getProjectById(projectId);
    theProject.startTimer(json.startTime);
    projectManager.saveToFile();
    res.json({ timers: theProject.timers });
})

// update timer
projectRouter.put('/timer/:timerId', (req, res) => {
    console.log("Params ... ", req.params);
    let projectId = req.params.id;
    let timerId = req.params.timerId;
    let updatedTimer = req.body;
    let projectManager = new ProjectManager();
    projectManager.loadFromFile();
    let theProject = projectManager.getProjectById(projectId);
    theProject.updateTimer(timerId, updatedTimer);
    projectManager.saveToFile();
    res.json({ timers: theProject.timers });
})

// delete timer
projectRouter.delete('/timer/:timerId', (req, res) => {
    let projectId = req.params.id;
    let timerId = req.params.timerId;
    let projectManager = new ProjectManager();
    projectManager.loadFromFile();
    let theProject = projectManager.getProjectById(projectId);
    theProject.deleteTimer(timerId);
    projectManager.saveToFile();
    res.json({ timers: theProject.timers });
})

router.use('/project/:id', projectRouter);
// module.exports = router
// export as ApiRoutes
export { router as ApiRoutes };