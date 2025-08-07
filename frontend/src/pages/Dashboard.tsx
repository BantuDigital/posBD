
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useState } from 'react';


const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex-1 flex flex-col md:flex-row">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-4 md:p-8 bg-white">
            <div className="bg-blue-50 rounded-xl shadow p-4 md:p-8 min-h-[200px] md:min-h-[300px] border border-gray-100">
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-blue-700">Ringkasan</h2>
              <p className="text-gray-600 text-sm md:text-base">Ini adalah halaman dashboard utama. Silakan tambahkan konten di sini.</p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;