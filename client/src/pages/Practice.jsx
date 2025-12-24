import { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { getProblems } from '../api/problems.api';
import { createPracticeLog } from '../api/practice.api';

const Practice = () => {
  const [problems, setProblems] = useState([]);
  const [problemId, setProblemId] = useState('');
  const [status, setStatus] = useState('solved');
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchProblems = async () => {
      const data = await getProblems();
      setProblems(data.data || []);
      setLoading(false);
    };

    fetchProblems();
  }, []);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!problemId || submitting) return;

  setSubmitting(true);

  try {
    await createPracticeLog({ problemId, status });
    setSuccess(true);
    setProblemId('');
  } catch (err) {
    console.error(err);
  } finally {
    setSubmitting(false);
  }
};


  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-slate-500">Loading practice page...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-semibold text-slate-800 mb-6">
        Practice
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-sm max-w-lg"
      >
        {/* Problem Selector */}
        <label className="block mb-2 text-sm font-medium text-slate-700">
          Select Problem
        </label>
        <select
          value={problemId}
          onChange={(e) => setProblemId(e.target.value)}
          className="w-full border p-2 rounded mb-4"
          required
        >
          <option value="">-- Choose a problem --</option>
          {problems.map((p) => (
            <option key={p._id} value={p._id}>
              {p.title} ({p.difficulty})
            </option>
          ))}
        </select>

        {/* Status */}
        <label className="block mb-2 text-sm font-medium text-slate-700">
          Status
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border p-2 rounded mb-6"
        >
          <option value="solved">Solved</option>
          <option value="attempted">Attempted</option>
        </select>

        {/* Submit */}
        <button
  type="submit"
  disabled={!problemId || submitting}
  className={`px-4 py-2 rounded text-white
    ${
      !problemId || submitting
        ? 'bg-slate-400 cursor-not-allowed'
        : 'bg-slate-900 hover:bg-slate-800'
    }
  `}
>
  {submitting ? 'Logging...' : 'Log Practice'}
</button>


        {success && (
          <p className="text-green-600 text-sm mt-4">
            Practice logged successfully ✅
          </p>
        )}
      </form>
    </DashboardLayout>
  );
};

export default Practice;
