import { useState } from 'react';
import { loginUser } from '../api/auth.api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser({ email, password });

      localStorage.setItem('token', data.token);

      navigate('/dashboard');
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  
    return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
    <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">
      
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          AlgoTrack
        </h1>
        <p className="text-slate-500 mt-2">
          Track practice. Analyze progress. Improve daily.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded-xl bg-slate-800 text-white font-medium hover:bg-slate-700 transition"
        >
          Sign in
        </button>
      </form>

      {/* Footer */}
      <p className="text-center text-sm text-slate-500 mt-6">
        Practice smarter, not harder 🚀
      </p>
    </div>
  </div>
);

  
};

export default Login;
