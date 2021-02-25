import './App.css';
import { SocketProvider } from './context/SocketContex';
import { UIProvider } from './context/UIContext';
import { RouterPage } from './pages/RouterPage';

function App() {
  return (
    <SocketProvider>
      <UIProvider>
        <RouterPage />
      </UIProvider>
    </SocketProvider>
  );
}

export default App;
