import dayjs from "dayjs";
import { IPoll } from "./types";

export const setEndDate = (date: string, day: number) => {
  let expireDate = new Date(date);
  expireDate.setDate(expireDate.getDate() + day);
  return dayjs(expireDate).format("MMM D, YYYY hh:mm:ss");
};

export const showMessage = (toast: any, status: string, title: string) => {
  return toast({
    title,
    status,
    isClosable: true,
  });
};

export const sortTitle = (data: Array<IPoll>, search: string) => {
  return data.filter((data: IPoll) =>
    data.title.toLowerCase().includes(search.toLowerCase())
  );
};

export const calculateVotePercentage = (vote: number, totalVote: number) => {
  const result = (vote / totalVote) * 100;
  return `${Math.round(result)}%`;
};

export const getColor = (vote: number, totalVote: number) => {
  const result = Math.round((vote / totalVote) * 100);
  return result === 0
    ? "red"
    : result > 0 && result < 40
    ? "#AEB404"
    : result >= 40 && result <= 70
    ? "blue"
    : result > 70
    ? "#24d394"
    : "black";
};

export const timeLeft = (endDate: string) => {
  const countDownDate = new Date(endDate).getTime();

  // Get today's date and time
  const now = new Date().getTime();

  // Find the distance between now and the count down date
  const distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  const days = Math.abs(Math.floor(distance / (1000 * 60 * 60 * 24)));
  const hours = Math.abs(
    Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  );
  const minutes = Math.abs(
    Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  );

  return days === 0
    ? `${hours}hr ${minutes}mins left`
    : days > 0
    ? `${days}d ${hours}hr ${minutes}mins left`
    : hours === 0
    ? `${minutes}mins left`
    : minutes === 0
    ? `Poll Expired`
    : "---";
};
