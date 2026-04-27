import './App.css';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import { useEffect } from 'react';
import CinematicSceneShowcase from './components/pages/Home';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function BodyClassSetter() {
  const location = useLocation();

  useEffect(() => {
    document.body.classList.remove('demo-1', 'demo-2');

    if (location.pathname === '/') {
      document.body.classList.add('demo-1');
    } else if (location.pathname === '/variant-2') {
      document.body.classList.add('demo-2');
    }
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <BodyClassSetter />
      <main id="main-content" className="" role="main">
        <Routes>
          <Route path="/" element={<CinematicSceneShowcase />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
