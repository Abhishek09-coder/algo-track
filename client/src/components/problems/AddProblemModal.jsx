import { useState } from 'react';

const AddProblemModal = ({ onClose, onAdd }) => {
  const [form, setForm] = useState({
    title: '',
    platform: '',
    difficulty: 'Easy',
    topics: '',
    url: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...form,
      topics: form.topics.split(',').map(t => t.trim()),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Add Problem</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="title"
            placeholder="Problem title"
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            name="platform"
            placeholder="Platform (LeetCode)"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <select
            name="difficulty"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>

          <input
            name="topics"
            placeholder="Topics (comma separated)"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            name="url"
            placeholder="Problem URL"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-slate-900 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProblemModal;
