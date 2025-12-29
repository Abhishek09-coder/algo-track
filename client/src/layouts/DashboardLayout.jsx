import { Link, useNavigate } from 'react-router-dom';

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen flex bg-slate-100">
      {/* Sidebar (Desktop only) */}
      <aside className="hidden md:block md:w-64 bg-white border-r px-6 py-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-10">
          AlgoTrack
        </h2>

        <nav className="space-y-4">
          <Link
            to="/dashboard"
            className="block text-slate-700 font-medium hover:text-slate-900"
          >
            Dashboard
          </Link>

          <Link
            to="/problems"
            className="block text-slate-700 font-medium hover:text-slate-900"
          >
            Problems
          </Link>

          <Link
            to="/practice"
            className="block text-slate-700 font-medium hover:text-slate-900"
          >
            Practice
          </Link>

          {/* 🔴 Logout (Desktop) */}
          <button
            onClick={handleLogout}
            className="mt-10 block w-full text-left text-red-600 font-medium hover:text-red-700"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Navigation */}
        <div className="md:hidden bg-white border-b px-4 py-3">
          <nav className="flex justify-between items-center text-sm font-medium">
            <Link
              to="/dashboard"
              className="text-slate-700 hover:text-slate-900"
            >
              Dashboard
            </Link>

            <Link
              to="/problems"
              className="text-slate-700 hover:text-slate-900"
            >
              Problems
            </Link>

            <Link
              to="/practice"
              className="text-slate-700 hover:text-slate-900"
            >
              Practice
            </Link>

            {/* 🔴 Logout (Mobile) */}
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-700"
            >
              Logout
            </button>
          </nav>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
