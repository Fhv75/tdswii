import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SearchResult = () => {
  const { searchTerm } = useParams();
  const [trackResults, setTrackResults] = useState([]);
  const [userResults, setUserResults] = useState([]);
  const [showNoResults, setShowNoResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setIsLoading(true);

      try {
        const trackResponse = await axios.post("http://localhost:5000/audio/searchTracks", {
          searchTerm: searchTerm,
        });

        setTrackResults(trackResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchUserResults = async () => {
      try {
        const userResponse = await axios.post("http://localhost:5000/users/searchUsers", {
          searchTerm: searchTerm,
        });

        setUserResults(userResponse.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
    fetchUserResults();
  }, [searchTerm]);

  useEffect(() => {
    setShowNoResults(trackResults.length === 0 && userResults.length === 0);
  }, [trackResults, userResults]);

  return (
    <div>
      <h1>Resultados para {searchTerm}</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {trackResults.length > 0 && (
            <>
              <h2>Pistas:</h2>
              <ul>
                {trackResults.map((result) => (
                  <li key={result.id}>{result.titulo}</li>
                ))}
              </ul>
            </>
          )}
          {userResults.length > 0 && (
            <>
              <h2>Usuarios:</h2>
              <ul>
                {userResults.map((result) => (
                  <li key={result.id}>{result.username}</li>
                ))}
              </ul>
            </>
          )}
          {showNoResults && <p>No results found.</p>}
        </>
      )}
    </div>
  );
};

export default SearchResult;
