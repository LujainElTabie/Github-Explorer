import RepoList from "./RepoList";
import SearchBar from "./SearchBar";

const Explorer = () => {
  return (
    <div>
      <h1>GitHub Repository Explorer</h1>
      <SearchBar />
      <RepoList />
    </div>
  );
};

export default Explorer;
