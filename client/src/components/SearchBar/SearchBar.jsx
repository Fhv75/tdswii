import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/audio/searchTracks",
        {
          searchTerm: searchTerm,
        }
      );
      setSearchResults(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form className="d-flex ms-auto align-items-center">
      <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button variant="outline-success" onClick={handleSearch} >Search</Button>
    </Form>
  );
};

export default SearchBar;
