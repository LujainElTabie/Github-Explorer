import { starRepo, unstarRepo } from "../../api/github";
import ForkIcon from "../../assets/fork-svgrepo-com.svg";
import StarIcon from "../../assets/star-svgrepo-com.svg";
import { useRepoStore } from "../../store/useRepoStore";
import styles from "./RepoItem.module.css";

interface RepoItemProps {
  repo: {
    id: number;
    full_name: string;
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
      const success = await unstarRepo(repo.owner.login, repo.name);
      if (success) toggleStar(repo.id, false);
    } else {
      const success = await starRepo(repo.owner.login, repo.name);
      if (success) toggleStar(repo.id, true);
    }
  };

  return (
    <div className={styles.itemcontainer}>
      <div className={styles.textcontainer}>
        <h3>{repo.full_name}</h3>
        <p>{repo.description}</p>
      </div>
      <div>
        <p className={styles.starcontainer}>
          <img src={StarIcon} alt="Star icon" width="16" height="16" />{" "}
          {repo.stargazers_count} |{" "}
          <img src={ForkIcon} alt="Star icon" width="16" height="16" />{" "}
          {repo.forks_count}
        </p>
        <button className={styles.star} onClick={handleStarToggle}>
          {isStarred ? "Unstar" : "Star"}
        </button>
      </div>
    </div>
  );
};

export default RepoItem;
