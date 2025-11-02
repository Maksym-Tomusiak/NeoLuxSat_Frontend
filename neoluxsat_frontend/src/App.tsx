import './App.css';
import Router from '@/router/Router';
import { ModalProvider } from './contexts/modalContext';

function App() {
  return (
    <>
      <ModalProvider>
        <Router />
      </ModalProvider>
    </>
  );
}

export default App;
