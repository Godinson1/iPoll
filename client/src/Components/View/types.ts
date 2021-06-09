export type optionsType = {
  content: string;
  id: string;
  count: number;
};

export type voteType = {
  setVoted: Function;
  setVoteLoading: Function;
  data: any;
};

export type IPoll = {
  _id: string;
  creator: string;
  title: string;
  endDate: string;
  category: string;
  options: Array<IPollOptions>;
  coverPhoto: string;
  status: string;
  total_votes: number;
  createdAt: string;
};

interface IPollOptions {
  id: string;
  content: string;
  count: number;
}
