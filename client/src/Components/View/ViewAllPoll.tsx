import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useToast, Divider } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import * as api from "../../setup/calls";
import { CATEGORIES } from "../Create";
import {
  setEndDate,
  timeLeft,
  LoadPoll,
  showMessage,
  sortTitle,
} from "./index";

import { IPoll } from "./types";
import "./styles.scss";

const ViewAllPoll = () => {
  const [pollData, setPollData] = useState<Array<IPoll>>([]);
  const [filterData, setFilterData] = useState<Array<IPoll>>(pollData);
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, error } = useQuery(
    "polls",
    api.getAllPolls
  );
  const toast = useToast();
  const history = useHistory();

  useEffect(() => {
    if (data && data.data) {
      const titleData = sortTitle(data.data, search);
      setFilterData(titleData);
      setPollData(titleData);
    }
  }, [search, data]);

  useEffect(() => {
    setFilterData(pollData);
  }, [pollData]);

  useEffect(() => {
    if (data && data.data) setPollData(data.data);
  }, [data]);

  if (isLoading) return <LoadPoll />;
  if (isError) {
    const err = error as { message: string };
    showMessage(toast, "error", err.message);
    return <div className="create-poll">Something went wrong...</div>;
  }

  const handleSortCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "All") {
      setPollData(data.data);
    } else {
      const categoryData = data.data.filter(
        (data: IPoll) =>
          data.category.toLowerCase() === e.target.value.toLowerCase()
      );
      setPollData(categoryData);
    }
  };

  return (
    <div>
      <motion.div
        transition={{ delay: 0.3, duration: 0.3 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="create-poll"
      >
        <div className="polls">
          <div className="poll-header">PUBLIC POLLS</div>
          <div className="flex-between">
            <div className="select-con">
              <label>Sort by category</label>
              <br />
              <select
                name="category"
                onChange={handleSortCategory}
                className="cselect"
              >
                {CATEGORIES.map(({ title, value }) => (
                  <option key={title} value={value}>
                    {title}
                  </option>
                ))}
              </select>
            </div>
            <div className="select-con">
              <label>Sort by title</label>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                name="search"
                placeholder="Search by title"
                className="cinput"
              />
            </div>
          </div>
          <div className="poll">
            {filterData && filterData.length === 0 ? (
              <div>No Result Found!</div>
            ) : (
              filterData &&
              filterData?.map((poll: IPoll) => {
                const { creator, total_votes, endDate, title, _id, createdAt } =
                  poll;
                return (
                  <div
                    key={_id}
                    onClick={() => history.push(`/poll/${_id}/view`)}
                    className="polloption"
                  >
                    <div>{title}</div>
                    <Divider />
                    <div className="poll-stat">
                      <div>
                        <span className="secondary">
                          {total_votes} {total_votes > 1 ? "votes" : "vote"} -{" "}
                          {timeLeft(setEndDate(createdAt, parseInt(endDate)))}.
                        </span>
                      </div>
                      <div>
                        Created By: <span className="secondary">{creator}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ViewAllPoll;
