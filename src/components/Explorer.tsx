import { useState } from "react";
import RepoList from "./RepoList/RepoList";
import SearchBar from "./SearchBar/SearchBar";

const Explorer = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <h1>GitHub Repository Explorer</h1>
      <SearchBar setLoading={setLoading} />
      <RepoList loading={loading} />
    </div>
  );
};

export default Explorer;
