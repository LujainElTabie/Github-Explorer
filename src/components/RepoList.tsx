import { useRepoStore } from "../store/useRepoStore";
import RepoItem from "./RepoItem";

const RepoList = () => {
  const repos = useRepoStore((state) => state.repos);

  return (
    <div>
      {repos.length === 0 ? (
        <p>No repositories found. Try searching for something!</p>
      ) : (
        repos.map((repo) => <RepoItem key={repo.id} repo={repo} />)
      )}
    </div>
  );
};

export default RepoList;
