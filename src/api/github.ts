import axios from "axios";

const API_URL = "https://api.github.com/search/repositories?q=";
const STAR_URL = "https://api.github.com/user/starred/";

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_API_TOKEN;

const api = axios.create({
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
  },
});

export const fetchRepos = async (query: string) => {
  try {
    const response = await api.get(`${API_URL}${query}`);
    return response.data.items.slice(0, 10); // Get only the first 10 repositories
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return [];
  }
};

export const starRepo = async (owner: string, repo: string) => {
  try {
    await api.put(`${STAR_URL}${owner}/${repo}`);
  } catch (error) {
    console.error("Error starring repository:", error);
  }
};

export const unstarRepo = async (owner: string, repo: string) => {
  try {
    await api.delete(`${STAR_URL}${owner}/${repo}`);
  } catch (error) {
    console.error("Error unstarring repository:", error);
  }
};
