import { createRoot } from 'react-dom/client'
import { StorageProvider } from './context/StorageProvider'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <StorageProvider>
        <App />
    </StorageProvider>
)
