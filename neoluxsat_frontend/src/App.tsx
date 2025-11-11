import './App.css';
import Router from '@/router/Router';
import { ModalProvider } from './contexts/modalContext';
import { UserProvider } from './contexts/userContext';

function App() {
  return (
    <>
      <ModalProvider>
        <UserProvider>
          <Router />
        </UserProvider>
      </ModalProvider>
    </>
  );
}

export default App;
