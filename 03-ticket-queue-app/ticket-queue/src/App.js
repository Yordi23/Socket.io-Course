import './App.css';
import { UIProvider } from './context/UIContext';
import { RouterPage } from './pages/RouterPage';

function App() {
  return (
    <UIProvider>
      <RouterPage />
    </UIProvider>
  );
}

export default App;
