import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes.jsx'
import './stylesheets/index.css'

createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router} />
  </>,
)
