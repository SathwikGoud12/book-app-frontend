import { Outlet } from 'react-router-dom';
import viteLogo from '/vite.svg';
import './App.css';  // Ensure App.css is correctly linked
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';  // Correct usage

function App() {
  return (
    <AuthProvider>  
      <Navbar />   {/* Navbar is outside <main> */}
      <main>  {/* Removed className="container" if not defined */}
        <Outlet />
      </main>
      <Footer />
    </AuthProvider>
  );
}

export default App;
