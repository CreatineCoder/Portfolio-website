import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import ContactHeader from './components/ContactHeader'
import ProjectsHeader from './components/ProjectsHeader'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import ProjectsPage from './pages/ProjectsPage'
import ContactPage from './pages/ContactPage'

function AppInner() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { pathname } = useLocation();
  const isContact = pathname === '/contact';
  const isProjects = pathname === '/projects';

  const renderHeader = () => {
    if (isContact) return <ContactHeader />;
    if (isProjects) return <ProjectsHeader />;
    return <Header isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode(d => !d)} />;
  };

  return (
    <div className={`app-container ${isDarkMode ? 'dark' : ''}`}>
      {renderHeader()}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppInner />
    </Router>
  )
}

export default App
