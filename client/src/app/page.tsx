'use client';

import React, { useState } from 'react';

const CreateIssuePage: React.FC = () => {
  const serverUrl = 'http://0.0.0.0:8000/issues';
  const [issues, setIssues] = useState<IssueInterface[]>([]);

  interface IssueInterface {
    id: number;
    title: string;
    description: string;
  }

  const handleCreateIssue = async (event: React.FormEvent) => {
    event.preventDefault();
    const title = (event.target as HTMLFormElement).title.value;
    const description = (event.target as HTMLFormElement).description.value;

    try {
      const response = await fetch(serverUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });

      if (response.ok) {
        // Issue created successfully, redirect to the issue details page
        // window.location.href = '/issues/' + response.json().id;
      } else {
        // Handle error response
        const errorData = await response.json();
        console.error('Failed to create issue:', errorData.message);
      }
    } catch (error) {
      console.error('An error occurred while creating the issue:', error);
    }
  };

  const handleGetAllIssues = async () => {
    try {
      const response = await fetch(serverUrl, {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        setIssues(data);
      } else {
        // Handle error response
        const errorData = await response.json();
        console.error('Failed to get issues:', errorData.message);
      }
    } catch (error) {
      console.error('An error occurred while getting the issues:', error);
    }
  };

  const handleUpdateIssue = async (event: React.FormEvent) => {
    event.preventDefault();
    const id = (event.target as HTMLFormElement).id.value;
    const title = (event.target as HTMLFormElement).title.value;
    const description = (event.target as HTMLFormElement).description.value;

    try {
      const response = await fetch(serverUrl + '/' + id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });

      if (response.ok) {
        // Issue updated successfully, redirect to the issue details page
        // window.location.href = '/issues/' + id;
        handleGetAllIssues();
      } else {
        // Handle error response
        const errorData = await response.json();
        console.error('Failed to update issue:', errorData.message);
      }
    } catch (error) {
      console.error('An error occurred while updating the issue:', error);
    }
  };

  const handleDeleteIssue = async (event: React.FormEvent) => {
    event.preventDefault();
    const id = (event.target as HTMLFormElement).id.value;

    try {
      const response = await fetch(serverUrl + '/' + id, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Issue deleted successfully, redirect to the issues list page
        // window.location.href = '/issues';
        handleGetAllIssues();
      } else {
        // Handle error response
        const errorData = await response.json();
        console.error('Failed to delete issue:', errorData.message);
      }
    } catch (error) {
      console.error('An error occurred while deleting the issue:', error);
    }
  };

  return (
    <>
      <div>
        {' '}
        <h1>Create Issue</h1>
        <form onSubmit={handleCreateIssue}>
          <div>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea id="description" />
          </div>
          <button type="submit">Create Issue</button>
        </form>
      </div>

      {/* A button that search on backend for all issue and print it on a simples table*/}
      <div>
        <button onClick={handleGetAllIssues}>Get All Issues</button>
        <table style={{ border: '1px solid white' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid white' }}>ID</th>
              <th style={{ border: '1px solid white' }}>Title</th>
              <th style={{ border: '1px solid white' }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr key={issue.id}>
                <td style={{ border: '1px solid white' }}>{issue.id}</td>
                <td style={{ border: '1px solid white' }}>{issue.title}</td>
                <td style={{ border: '1px solid white' }}>
                  {issue.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h1>Update Issue</h1>
        <form onSubmit={handleUpdateIssue}>
          <div>
            <label htmlFor="id">ID:</label>
            <input type="text" id="id" />
          </div>
          <div>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea id="description" />
          </div>
          <button type="submit">Update Issue</button>
        </form>
      </div>

      <div>
        <h1>Delete Issue</h1>
        <form onSubmit={handleDeleteIssue}>
          <div>
            <label htmlFor="id">ID:</label>
            <input type="text" id="id" />
          </div>
          <button type="submit">Delete Issue</button>
        </form>
      </div>
    </>
  );
};

export default CreateIssuePage;
