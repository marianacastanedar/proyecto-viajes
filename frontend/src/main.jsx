import { createRoot } from 'react-dom/client'
import { StorageProvider } from './context/StorageProvider'
import { ThemeProvider } from './context/ThemeProvider'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <ThemeProvider>
        <StorageProvider>
            <App />
        </StorageProvider>
    </ThemeProvider>
)
