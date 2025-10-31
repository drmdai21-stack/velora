import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import HomePage from './App';
import PilotPage from './pages/PilotPage';
import PrivacyPage from './pages/PrivacyPage';
import './styles/globals.css';

function Router() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    
    // Also update on internal navigation
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="/"]');
      if (link) {
        const href = link.getAttribute('href');
        if (href && href.startsWith('/') && !href.startsWith('//')) {
          e.preventDefault();
          window.history.pushState({}, '', href);
          setCurrentPath(href);
          window.scrollTo(0, 0);
        }
      }
    };
    
    document.addEventListener('click', handleClick);
    
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  // Simple client-side routing
  const renderPage = () => {
    if (currentPath === '/pilot' || currentPath === '/pilot/') {
      return <PilotPage />;
    }
    if (currentPath === '/privacy' || currentPath === '/privacy/') {
      return <PrivacyPage />;
    }
    return <HomePage />;
  };

  return renderPage();
}

// Mount the application
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <Router />
  </StrictMode>
);

export default Router;
