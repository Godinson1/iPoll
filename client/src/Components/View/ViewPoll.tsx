import React, { useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { Divider } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import * as api from "../../setup/calls";
import { optionsType } from "./types";
import {
  setEndDate,
  timeLeft,
  calculateVotePercentage,
  getColor,
  ViewPollError,
  LoadPoll,
  Vote,
} from "./index";
import "./styles.scss";

const ViewPoll = () => {
  const [voted, setVoted] = useState(false);
  const [voteLoading, setVoteLoading] = useState(false);
  const { url } = useRouteMatch();
  const id = url.slice(6, -5);

  const { data, isLoading, isError, error } = useQuery(
    ["poll", id],
    () => api.getPoll(id),
    {
      enabled: Boolean(id),
    }
  );

  if (isLoading) return <LoadPoll />;
  if (isError) {
    const err = error as { message: string };
    return <ViewPollError error={err.message} />;
  }

  return (
    <div>
      {data && data.data && (
        <div className="create">
          <div className={voteLoading ? "loading-container" : undefined}>
            <div className="create-form">
              <h1>{data.data.title} </h1>
              <Divider />
              <br />
              {voted ? (
                <div className="graph">
                  {data.data.options.map(
                    ({ content, id, count }: optionsType) => (
                      <motion.div
                        initial={{ x: -70, width: 0, backgroundColor: "white" }}
                        transition={{ duration: 0.5 }}
                        animate={{
                          x: 0,
                          width: "100%",
                          backgroundColor: getColor(
                            count,
                            data.data.total_votes
                          ),
                        }}
                        key={id}
                        id="voted"
                      >
                        <div>{content}</div>
                        <div>
                          {calculateVotePercentage(
                            count,
                            data.data.total_votes
                          )}
                        </div>
                      </motion.div>
                    )
                  )}
                </div>
              ) : (
                <Vote
                  setVoted={setVoted}
                  data={data.data}
                  setVoteLoading={setVoteLoading}
                />
              )}
              <br />
              <div className="poll-stat">
                <span className="secondary">
                  {data.data.total_votes}{" "}
                  {data.data.total_votes > 1 ? "votes" : "vote"} -{" "}
                  {timeLeft(
                    setEndDate(data.data.createdAt, parseInt(data.data.endDate))
                  )}
                  .
                </span>
              </div>
              <div className="poll-stat">
                Created by:
                <span className="secondary"> {data.data.creator}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewPoll;
