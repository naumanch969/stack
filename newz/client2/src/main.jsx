import ReactDOM from 'react-dom/client';
import App from './App';
import { ContextProvider } from "./contexts/ContextProvider";
import "./index.css";
import dotenv from 'dotenv'

const root = ReactDOM.createRoot(document.getElementById('root'));
// dotenv.config()

root.render(
    <ContextProvider>
        <App />
    </ContextProvider>
);


