import { starRepo, unstarRepo } from "../api/github";
import { useRepoStore } from "../store/useRepoStore";

interface RepoItemProps {
  repo: {
    id: number;
    name: string;
    owner: { login: string };
    description: string;
    stargazers_count: number;
    forks_count: number;
  };
}

const RepoItem = ({ repo }: RepoItemProps) => {
  const { starredRepos, toggleStar } = useRepoStore();
  const isStarred = starredRepos.has(repo.id);

  const handleStarToggle = async () => {
    if (isStarred) {
      await unstarRepo(repo.owner.login, repo.name);
      toggleStar(repo.id, false); // Decrease star count
    } else {
      await starRepo(repo.owner.login, repo.name);
      toggleStar(repo.id, true); // Increase star count
    }
  };

  return (
    <div>
      <h3>{repo.name}</h3>
      <p>{repo.description}</p>
      <p>
        ⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}
      </p>
      <button onClick={handleStarToggle}>
        {isStarred ? "Unstar" : "Star"}
      </button>
    </div>
  );
};

export default RepoItem;
