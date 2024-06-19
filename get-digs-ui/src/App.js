import 'bulma/css/bulma.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Dashboard } from './pages/Dashboard';
import { FocusOnProject } from './pages/FocusOnProject';
import { LayoutMain } from './pages/LayoutMain';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LayoutMain />}>
          <Route index element={<Dashboard />} />
          <Route path="project/:id" element={<FocusOnProject />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
