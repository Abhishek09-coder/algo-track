import { useState } from 'react';
import { registerUser } from '../api/auth.api';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await registerUser(form);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-4">Register</h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <input
          name="name"
          placeholder="Name"
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-3 rounded"
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-4 rounded"
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-slate-900 text-white py-2 rounded hover:bg-slate-800"
        >
          Register
        </button>

        <p className="text-sm mt-4 text-center">
          Already have an account?{' '}
          <Link to="/" className="text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
