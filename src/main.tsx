import React from 'react'
import ReactDOM from 'react-dom/client'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import App from './App'
import './style/index.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <DndProvider backend={HTML5Backend}>
          <App />
    </DndProvider>
)
