import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TrackApproval = () => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    fetchTracks();
  }, []);
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  };
  
  
  const fetchTracks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/audio/pendingTracks");
      const users = await fetchUsers();
  
      const tracksWithUsernames = response.data.map((track) => {
        const user = users.find((user) => user.correo === track.id_user_cargas);
        return {
          ...track,
          username: user ? user.username : "Unknown User",
        };
      });
  
      setTracks(tracksWithUsernames);
    } catch (error) {
      console.error('Error fetching tracks:', error);
    }
  };
  

  const approveTrack = async (trackId) => {
    try {
      await axios.put(`http://localhost:5000/audio/approveTrack/${trackId}`);
      fetchTracks();
    } catch (error) {
      console.error('Error approving track:', error);
    }
  };
  const rejectTrack = async (trackId) => {
    try {
      await axios.put(`http://localhost:5000/audio/rejectTrack/${trackId}`);
      fetchTracks();
    } catch (error) {
      console.error('Error rejecting track:', error);
    }
  };
  return (
    <div>
      <h1>Track Approval</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>User</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((track) => (
            <tr key={track.id}>
              <td>{track.titulo}</td>
              <td>{track.id_user_cargas}</td>
             
              <td>
                <button onClick={() => approveTrack(track.id)}>Approve</button>
                <button onClick={() => rejectTrack(track.id)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrackApproval;
