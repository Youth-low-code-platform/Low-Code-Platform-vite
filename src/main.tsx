import ReactDOM from 'react-dom/client'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
// import App from './App'
import './style/index.scss'
import { Preview } from './views/preview'
import { Editor } from './views/editor'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <DndProvider backend={HTML5Backend}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={'/editor/1'}></Navigate>} />
        <Route path="/editor/:id" element={<Editor />} />
        <Route path="/preview/:id" element={<Preview />} />
      </Routes>
    </BrowserRouter>
  </DndProvider>
)
