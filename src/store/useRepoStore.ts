import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Repo {
  id: number;
  full_name: string;
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

export const useRepoStore = create<RepoStore>()(
  persist(
    (set) => ({
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
                  stargazers_count:
                    repo.stargazers_count + (increment ? 1 : -1),
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
    }),
    {
      name: "repo-storage",
      partialize: (state) => ({ starredRepos: state.starredRepos }),
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const { state } = JSON.parse(str);
          return {
            state: {
              ...state,
              repos: [],
              starredRepos: new Set(state.starredRepos),
            },
          };
        },
        setItem: (name, value) => {
          const str = JSON.stringify({
            state: {
              ...value.state,
              starredRepos: Array.from(value.state.starredRepos),
            },
          });
          localStorage.setItem(name, str);
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);
