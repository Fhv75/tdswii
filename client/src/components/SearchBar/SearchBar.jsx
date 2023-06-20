import React, { useState } from "react";
import { Form, Button, ListGroup, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isInvalidSearch, setIsInvalidSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      setIsInvalidSearch(true);
      return;
    }

    setIsInvalidSearch(false);
    setIsLoading(true);

    navigate(`/search-results/${searchTerm}`);

    try {
      const audioResponse = await axios.post("http://localhost:5000/audio/searchTracks", {
        searchTerm: searchTerm,
      });

      const userResponse = await axios.post("http://localhost:5000/users/searchUsers", {
        searchTerm: searchTerm,
      });

      
      console.log("Audio Results:", audioResponse.data);
      console.log("User Results:", userResponse.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setSearchTerm("");
    }
  };

  const handleChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    setIsInvalidSearch(searchTerm.trim() === "");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleSearch();
  };

  return (
    <div>
      <Form className="d-flex ms-auto align-items-center" onSubmit={handleSubmit}>
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          value={searchTerm}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          isInvalid={isInvalidSearch}
        />
        <Form.Control.Feedback type="invalid">
          Please enter a search term.
        </Form.Control.Feedback>
        <Button variant="outline-success" type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              <span className="visually-hidden">Loading...</span>
            </>
          ) : (
            "Search"
          )}
        </Button>
      </Form>
    </div>
  );
};

export default SearchBar;
