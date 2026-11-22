import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Toast from './Toast';
import { useShop } from '../context/ShopContext';

export default function Layout() {
  const { toast } = useShop();
  return (
    <div className="app-shell">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
      <Toast toast={toast} />
    </div>
  );
}
