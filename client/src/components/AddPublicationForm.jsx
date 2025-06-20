import React, { useState } from "react";

const AddPublicationForm = ({ onAddPublication, user }) => {
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState(user?.name || "");  // Pre-fill with user's name
  const [publicationDate, setPublicationDate] = useState("");
  const [journal, setJournal] = useState("");
  const [citations, setCitations] = useState("");
  const [isPatent, setIsPatent] = useState(false);
  const [doi, setDoi] = useState("");
  const [impactFactor, setImpactFactor] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!user || !user.department) {
      setError('User or department information is missing. Please ensure you are logged in.');
      return;
    }

    // Ensure the current user is included in the authors list
    let authorsList = authors.split(',').map(a => a.trim()).filter(a => a);
    if (!authorsList.some(author => author.toLowerCase() === user.name.toLowerCase())) {
      authorsList = [user.name, ...authorsList];
    }

    const newPublication = {
      title,
      authors: authorsList,
      publicationDate,
      journal,
      department: user.department,
      citations: parseInt(citations, 10) || 0,
      isPatent,
      // Only include DOI if it has a value
      ...(doi && doi.trim() && { doi: doi.trim() }),
      // Only include impact factor if it has a value
      ...(impactFactor && parseFloat(impactFactor) > 0 && { impactFactor: parseFloat(impactFactor) }),
    };

    try {
      onAddPublication(newPublication);
      // Clear form fields
      setTitle("");
      setAuthors(user.name); // Reset to just the user's name
      setPublicationDate("");
      setJournal("");
      setCitations("");
      setIsPatent(false);
      setDoi("");
      setImpactFactor("");
      setError("");
    } catch (err) {
      setError('Failed to add publication. Please try again.');
    }
  };

  if (!user) {
    return (
      <div className="text-red-600 p-4 rounded-lg">
        Please log in to add publications.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-semibold mb-4">Add New Publication</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mb-4">
        <input
          type="text"
          placeholder="Title"
          className="border border-gray-300 p-3 rounded-lg w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Authors (comma separated)"
          className="border border-gray-300 p-3 rounded-lg w-full"
          value={authors}
          onChange={(e) => setAuthors(e.target.value)}
          required
        />
        <small className="text-gray-500">Your name will be automatically included in the authors list.</small>
      </div>
      <div className="mb-4">
        <input
          type="date"
          className="border border-gray-300 p-3 rounded-lg w-full"
          value={publicationDate}
          onChange={(e) => setPublicationDate(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Journal/Conference"
          className="border border-gray-300 p-3 rounded-lg w-full"
          value={journal}
          onChange={(e) => setJournal(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="number"
          placeholder="Citations"
          className="border border-gray-300 p-3 rounded-lg w-full"
          value={citations}
          onChange={(e) => setCitations(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <input
            type="checkbox"
            checked={isPatent}
            onChange={() => setIsPatent(!isPatent)}
            className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <div>
            <span className="font-semibold text-blue-800 dark:text-blue-300">📄 Create Patent Entry</span>
            <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
              Check this box to automatically create a corresponding patent entry based on this publication.
            </p>
          </div>
        </label>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="DOI (optional)"
          className="border border-gray-300 p-3 rounded-lg w-full"
          value={doi}
          onChange={(e) => setDoi(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <input
          type="number"
          placeholder="Impact Factor (optional)"
          className="border border-gray-300 p-3 rounded-lg w-full"
          value={impactFactor}
          onChange={(e) => setImpactFactor(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full"
      >
        Add Publication
      </button>
    </form>
  );
};

export default AddPublicationForm;
