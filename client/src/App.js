import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/issues';

function App() {
  const [issues, setIssues] = useState([]);
  const [newIssue, setNewIssue] = useState({ title: '', description: '' });
  const [updateIssue, setUpdateIssue] = useState({ id: '', title: '', description: '' });
  const [deleteIssueId, setDeleteIssueId] = useState('');

  useEffect(() => {
    // Fetch issues on component mount
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const response = await axios.get(API_URL);
      setIssues(response.data);
    } catch (error) {
      console.error('Error fetching issues:', error);
    }
  };

  const createIssue = async () => {
    try {
      const response = await axios.post(API_URL, newIssue);
      console.log('Create Issue Response:', response.data);
      // Clear the form and refresh the issue list
      setNewIssue({ title: '', description: '' });
      fetchIssues();
    } catch (error) {
      console.error('Error creating issue:', error);
    }
  };

  const updateIssueById = async () => {
    try {
      const response = await axios.put(API_URL, updateIssue);
      console.log('Update Issue Response:', response.data);
      // Clear the form and refresh the issue list
      setUpdateIssue({ id: '', title: '', description: '' });
      fetchIssues();
    } catch (error) {
      console.error('Error updating issue:', error);
    }
  };

  const deleteIssueById = async () => {
    try {
      const response = await axios.delete(API_URL, { data: { id: deleteIssueId } });
      console.log('Delete Issue Response:', response.data);
      // Clear the form and refresh the issue list
      setDeleteIssueId('');
      fetchIssues();
    } catch (error) {
      console.error('Error deleting issue:', error);
    }
  };

  return (
    <div>
      <h1>React Issues App</h1>

      {/* Create Issue Form */}
      <div>
        <h2>Create Issue</h2>
        <label>Title:
          <input type="text" value={newIssue.title} onChange={(e) => setNewIssue({ ...newIssue, title: e.target.value })} />
        </label>
        <br />
        <label>Description:
          <input type="text" value={newIssue.description} onChange={(e) => setNewIssue({ ...newIssue, description: e.target.value })} />
        </label>
        <br />
        <button onClick={createIssue}>Create Issue</button>
      </div>

      {/* Update Issue Form */}
      <div>
        <h2>Update Issue</h2>
        <label>ID:
          <input type="text" value={updateIssue.id} onChange={(e) => setUpdateIssue({ ...updateIssue, id: e.target.value })} />
        </label>
        <br />
        <label>Title:
          <input type="text" value={updateIssue.title} onChange={(e) => setUpdateIssue({ ...updateIssue, title: e.target.value })} />
        </label>
        <br />
        <label>Description:
          <input type="text" value={updateIssue.description} onChange={(e) => setUpdateIssue({ ...updateIssue, description: e.target.value })} />
        </label>
        <br />
        <button onClick={updateIssueById}>Update Issue</button>
      </div>

      {/* Delete Issue Form */}
      <div>
        <h2>Delete Issue</h2>
        <label>ID:
          <input type="text" value={deleteIssueId} onChange={(e) => setDeleteIssueId(e.target.value)} />
        </label>
        <br />
        <button onClick={deleteIssueById}>Delete Issue</button>
      </div>

      {/* Issue List */}
      <div>
        <h2>Issues</h2>
        <ul>
          {issues.map(issue => (
            <li key={issue.id}>
              {`ID: ${issue.id}, Title: ${issue.title}, Description: ${issue.description}`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
