import { IPoll, IVote } from "./types";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/polls",
});

export const getAllPolls = () => api.get("/").then((res) => res.data);

export const getPoll = async (id: string) => {
  try {
    const res = await api.get(`/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const createPoll = async (data: IPoll) => {
  try {
    const res = await api.post(`/poll`, data);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const createVote = async (data: IVote) => {
  try {
    const res = await api.put(`/${data.id}/vote`, data);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
