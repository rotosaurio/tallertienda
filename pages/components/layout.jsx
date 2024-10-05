import Navbar from './navbar';
import FloatingButton from './FloatingButton';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <main className="flex-grow">
        {children}
      </main>
      <FloatingButton />
    </div>
  );
};

export default Layout;
