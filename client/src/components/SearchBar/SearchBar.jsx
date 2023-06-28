import React, { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
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

      const userResponse = await axios.post("http://localhost:5000/user/searchUsers", {
        searchTerm: searchTerm,
       
      });
      const tagResponse = await axios.post("http://localhost:5000/audio/searchTags", {
        searchTerm: searchTerm,
       
      });

      
      console.log("Audio Results:", audioResponse.data);
      console.log("User Results:", userResponse.data);
      console.log("Tags results", tagResponse.data);
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
    <div className="search-bar-container ms-lg-auto">
      <Form className="d-flex align-items-center" onSubmit={handleSubmit}>
        <Form.Control
          type="search"
          placeholder="Busca por nombre, artista o genero"
          className="me-2"
          aria-label="Search"
          value={searchTerm}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          isInvalid={isInvalidSearch}
        />
        <Form.Control.Feedback type="invalid">
          Ingresa un término de busqueda.
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
              <span className="visually-hidden">Cargando...</span>
            </>
          ) : (
            "Buscar"
          )}
        </Button>
      </Form>
    </div>
  );
};

export default SearchBar;
