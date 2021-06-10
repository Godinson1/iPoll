import { IPoll, IVote, IContact } from "./types";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

/*
* Poll Calls
----------------------------------------------------------
----------------------------------------------------------
*/

export const getAllPolls = () => api.get("/polls").then((res) => res.data);

export const getPoll = async (id: string) => {
  try {
    const res = await api.get(`/polls/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const createPoll = async (data: IPoll) => {
  try {
    const res = await api.post(`/polls/poll`, data);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const createVote = async (data: IVote) => {
  try {
    const res = await api.put(`/polls/${data.id}/vote`, data);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

/*
* Contact Calls
----------------------------------------------------------
----------------------------------------------------------
*/

export const createContact = async (data: IContact) => {
  try {
    const res = await api.post(`/contacts/contact`, data);
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
