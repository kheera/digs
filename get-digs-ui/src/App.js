import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { ListContainerTasks } from './components/ListContainerTasks';
import 'bulma/css/bulma.min.css';
// import hero section
import { HeroSection } from './components/HeroSection';
import '@fortawesome/fontawesome-free/css/all.css';
// import router
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';



function App() {
  // create tasks variable

  return (
      <div className="App">
          <HeroSection/>
          <section className="section my-2">
              <div className="content">
                  <h1>Tasks</h1>
                  <ListContainerTasks/>
              </div>
          </section>
          <footer className="footer my-2">
              <div className="content has-text-centered">
                  <p>© 2024 DIGS</p>
              </div>
          </footer>
      </div>
  );
}

export default App;
