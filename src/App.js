import React, { useEffect, useState } from 'react';
import { KanbanBoard } from './KanbanBoard/KanbanBoard';

// Component to fetch and display Kanban board data
function App() {
  const [tickets, setTickets] = useState([]); // State to hold the ticket data
  const [users, setUsers] = useState([]); // State to hold the user data
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track errors

  // Function to fetch tickets from the API
  const fetchTickets = async () => {
    try {
      const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
      
      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the JSON response
      const data = await response.json();

      // Set the data into state
      console.log(data)
      setTickets(data.tickets);
      setUsers(data.users);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // Fetch tickets when the component mounts
  useEffect(() => {
    fetchTickets();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
      <div className='kanban-container'>
        <KanbanBoard tickets={tickets} users={users} />
      </div>
  );
}


export default App;
