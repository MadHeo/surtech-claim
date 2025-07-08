import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* 헤더 */}
      <Header onMenuToggle={toggleSidebar} isMenuOpen={isSidebarOpen} />

      <div className="flex flex-1 overflow-hidden">
        {/* 사이드바 */}
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

        {/* 메인 콘텐츠 */}
        <main className="flex-1 lg:ml-0 overflow-auto">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
