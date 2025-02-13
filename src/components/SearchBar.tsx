import { useState } from "react";
import { fetchRepos } from "../api/github";
import { useRepoStore } from "../store/useRepoStore";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const setRepos = useRepoStore((state) => state.setRepos);

  const handleSearch = async () => {
    if (query.trim() !== "") {
      const results = await fetchRepos(query);
      setRepos(results);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search GitHub Repositories..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
