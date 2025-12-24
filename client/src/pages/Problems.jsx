import { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import {
  getProblems,
  createProblem,
  deleteProblem,
} from '../api/problems.api';
import AddProblemModal from '../components/problems/AddProblemModal';

const Problems = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const data = await getProblems();
        setProblems(data.data ?? []);
      } catch (err) {
        console.error('Failed to fetch problems', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  const handleAddProblem = async (payload) => {
    try {
      const res = await createProblem(payload);
      setProblems((prev) => [res.problem, ...prev]);
      setShowModal(false);
    } catch (err) {
      console.error('Failed to add problem', err);
    }
  };

  const handleDeleteProblem = async (id) => {
    try {
      await deleteProblem(id);
      setProblems((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error('Failed to delete problem', err);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-slate-500">Loading problems...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-slate-800">
          Problems
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800"
        >
          + Add Problem
        </button>
      </div>

      {/* Empty State */}
      {problems.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow-sm text-slate-600">
          No problems added yet.
        </div>
      ) : (
        <div className="space-y-4">
          {problems.map((problem) => (
            <div
              key={problem._id}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">
                    {problem.title}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    {problem.platform}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`text-sm font-medium px-3 py-1 rounded-full
                      ${
                        problem.difficulty === 'Easy'
                          ? 'bg-green-100 text-green-700'
                          : problem.difficulty === 'Medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }
                    `}
                  >
                    {problem.difficulty}
                  </span>

                  <button
                    onClick={() => handleDeleteProblem(problem._id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Topics */}
              {problem.topics?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {problem.topics.map((topic) => (
                    <span
                      key={topic}
                      className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              )}

              {/* URL */}
              {problem.url && (
                <a
                  href={problem.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-3 text-sm text-blue-600 hover:underline"
                >
                  Open Problem →
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add Problem Modal */}
      {showModal && (
        <AddProblemModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddProblem}
        />
      )}
    </DashboardLayout>
  );
};

export default Problems;
