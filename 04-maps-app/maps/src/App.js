import logo from './logo.svg';
import './App.css';
import { MapPage } from './pages/MapPage';
import { SocketProvider } from './context/SocketContext';

function App() {
  return (
    <SocketProvider>
      <MapPage />
    </SocketProvider>
  );
}

export default App;
