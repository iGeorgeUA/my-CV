import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { QuestionsProvider } from './QuestionsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QuestionsProvider>
    <App />
  </QuestionsProvider>
);