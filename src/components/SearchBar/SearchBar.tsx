import { useState } from "react";
import { fetchRepos } from "../../api/github";
import { useRepoStore } from "../../store/useRepoStore";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  setLoading: (loading: boolean) => void;
}

const SearchBar = ({ setLoading }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const setRepos = useRepoStore((state) => state.setRepos);

  const handleSearch = async () => {
    if (query.trim() !== "") {
      setLoading(true);
      const results = await fetchRepos(query);
      setRepos(results);
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={styles.searchcontainer}>
      <input
        className={styles.searchbar}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search GitHub Repositories..."
        onKeyDown={handleKeyDown}
      />
      <button className={styles.searchbtn} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
