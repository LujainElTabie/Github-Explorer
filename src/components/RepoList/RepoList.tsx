import { useRepoStore } from "../../store/useRepoStore";
import RepoItem from "../RepoItem/RepoItem";
import DotSpinner from "../Spinner/DotSpinner";
import styles from "./RepoList.module.css";

interface RepoListProps {
  loading: boolean;
}

const RepoList = ({ loading }: RepoListProps) => {
  const repos = useRepoStore((state) => state.repos);

  if (loading)
    return (
      <div className={styles.spinnercontainer}>
        <DotSpinner />
      </div>
    );

  return (
    <div className={styles.repolistcontainer}>
      {repos.length === 0 ? (
        <p className={styles.norepostext}>
          No repositories found. Try searching for something!
        </p>
      ) : (
        repos.map((repo) => <RepoItem key={repo.id} repo={repo} />)
      )}
    </div>
  );
};

export default RepoList;
