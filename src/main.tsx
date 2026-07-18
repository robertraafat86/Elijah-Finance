// Safe LocalStorage & SessionStorage fallback for iframe/sandbox environments (e.g., Google Chrome preview)
try {
  const testKey = '__storage_test__';
  window.localStorage.setItem(testKey, testKey);
  window.localStorage.removeItem(testKey);
} catch (e) {
  console.warn('LocalStorage is blocked or inaccessible in this environment. Falling back to in-memory storage.');
  
  const createMemoryStorage = () => {
    let store: Record<string, string> = {};
    return {
      getItem: (key: string) => (key in store ? store[key] : null),
      setItem: (key: string, value: string) => {
        store[key] = String(value);
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
      key: (index: number) => Object.keys(store)[index] || null,
      get length() {
        return Object.keys(store).length;
      }
    };
  };

  Object.defineProperty(window, 'localStorage', {
    value: createMemoryStorage(),
    writable: true,
    configurable: true
  });
  
  Object.defineProperty(window, 'sessionStorage', {
    value: createMemoryStorage(),
    writable: true,
    configurable: true
  });
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import './index.css';
import './lib/i18n';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);

/* // Registration disabled to fix white screen issues in preview
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(error => {
      console.log('SW registration failed:', error);
    });
  });
}
*/
