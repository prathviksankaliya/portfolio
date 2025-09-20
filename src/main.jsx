import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Add global error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

console.log('Main.jsx starting...');

try {
  const root = document.getElementById('root');
  
  if (!root) {
    throw new Error('Root element not found');
  }
  
  console.log('Root element found, rendering app...');
  
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  
  console.log('App rendered successfully');
} catch (error) {
  console.error('Failed to render app:', error);
  document.body.innerHTML = `
    <div style="padding: 20px; text-align: center; font-family: sans-serif;">
      <h1>Failed to load portfolio</h1>
      <p style="color: red;">${error.message}</p>
      <p>Please check the browser console for more details.</p>
      <button onclick="location.reload()">Reload Page</button>
    </div>
  `;
}