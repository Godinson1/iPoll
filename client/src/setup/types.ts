export interface IPoll {
  creator: string;
  title: string;
  endDate: string;
  category: string;
  options: Array<string>;
  coverPhoto: string;
  status: string;
}

export interface IVote {
  id: string;
  optionsId: string;
  clientIp: string;
}

export interface IContact {
  name: string;
  email: string;
  message: string;
}
