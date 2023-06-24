import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./SearchResult.css";
import axios from "axios";

const SearchResult = () => {
  const { searchTerm } = useParams();
  const [trackResults, setTrackResults] = useState([]);
  const [userResults, setUserResults] = useState([]);
  const [tagResults, setTagResults] = useState([]);
  const [activeTab, setActiveTab] = useState("tracks");
  const [showNoResults, setShowNoResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setIsLoading(true);

      try {
        const trackResponse = await axios.post(
          "http://localhost:5000/audio/searchTracks",
          {
            searchTerm: searchTerm,
          }
        );

        setTrackResults(trackResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchUserResults = async () => {
      try {
        const userResponse = await axios.post(
          "http://localhost:5000/users/searchUsers",
          {
            searchTerm: searchTerm,
          }
        );

        setUserResults(userResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchTagResults = async () => {
      try {
        const tagResponse = await axios.post(
          "http://localhost:5000/audio/searchTags",
          {
            searchTerm: searchTerm,
          }
        );

        setTagResults(tagResponse.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
    fetchUserResults();
    fetchTagResults();
  }, [searchTerm]);

  useEffect(() => {
    setShowNoResults(
      trackResults.length === 0 &&
        userResults.length === 0 &&
        tagResults.length === 0
    );
  }, [trackResults, userResults, tagResults]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
         <div className="search-result-container">
        <h1 className="result-section-title">Resultados para: "{searchTerm}"</h1>
        <div className="tab-container">
          <button
            className={`tab ${activeTab === "tracks" ? "active" : ""}`}
            onClick={() => handleTabChange("tracks")}
          >
            Pistas
          </button>
          <button
            className={`tab ${activeTab === "users" ? "active" : ""}`}
            onClick={() => handleTabChange("users")}
          >
            Artistas
          </button>
          <button
            className={`tab ${activeTab === "genres" ? "active" : ""}`}
            onClick={() => handleTabChange("genres")}
          >
            Géneros
          </button>
        </div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {activeTab === "tracks" && (
              <>
                {trackResults.length > 0 ? (
                  <ul className="result-list">
                    {trackResults.map((result) => (
                      <li key={result.id}>{result.titulo}</li>
                    ))}
                  </ul>
                ) : (
                  showNoResults && <p className="no-results">No se encontraron resultados.</p>
                )}
              </>
            )}
    
            {activeTab === "users" && (
              <>
                {userResults.length > 0 ? (
                  <ul className="result-list">
                    {userResults.map((result) => (
                      <li key={result.id}>
                        <Link to={`/user/${result.username}`}>
                          {result.username}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  showNoResults && <p className="no-results">No se encontraron resultados.</p>
                )}
              </>
            )}
            {activeTab === "genres" && (
              <>
                {tagResults.length > 0 ? (
                  <ul className="result-list">
                    {tagResults.map((result) => (
                      <li key={result.id}>{result.TAG}</li>
                    ))}
                  </ul>
                ) : (
                  showNoResults && <p className="no-results">No se encontraron resultados.</p>
                )}
              </>
            )}
          </>
        )}
      </div>
    );
    
};

export default SearchResult;
