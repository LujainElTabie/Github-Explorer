import { create } from "zustand";

interface Repo {
  id: number;
  name: string;
  owner: { login: string };
  description: string;
  stargazers_count: number;
  forks_count: number;
}

interface RepoStore {
  repos: Repo[];
  starredRepos: Set<number>;
  setRepos: (repos: Repo[]) => void;
  toggleStar: (id: number, increment: boolean) => void;
}

export const useRepoStore = create<RepoStore>((set) => ({
  repos: [],
  starredRepos: new Set(),
  setRepos: (repos) => set({ repos }),
  toggleStar: (id, increment) =>
    set((state) => {
      const updatedStars = new Set(state.starredRepos);
      const updatedRepos = state.repos.map((repo) =>
        repo.id === id
          ? {
              ...repo,
              stargazers_count: repo.stargazers_count + (increment ? 1 : -1),
            }
          : repo
      );

      if (updatedStars.has(id)) {
        updatedStars.delete(id);
      } else {
        updatedStars.add(id);
      }

      return { starredRepos: updatedStars, repos: updatedRepos };
    }),
}));
