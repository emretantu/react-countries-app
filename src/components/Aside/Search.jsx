import { useState } from "react";

const Search = ({ onSearch }) => {

  const [query, setQuery] = useState("");

  const handleSearchInputChange = (e) => {
    setQuery(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input type="search" value={query} onChange={handleSearchInputChange} />
      <button type="submit">Search</button>
    </form>
  );

}

export default Search;