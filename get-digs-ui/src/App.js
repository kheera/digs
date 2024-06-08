import 'bulma/css/bulma.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Dashboard } from './pages/Dashboard';
import { FocusOnTask } from './pages/FocusOnTask';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/task/:id" element={<FocusOnTask/>}/>
      </Routes>
    </Router>
  );
}

export default App;
