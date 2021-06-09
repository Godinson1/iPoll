import React from "react";
import { useToast } from "@chakra-ui/react";
import * as api from "../../setup/calls";
import { useMutation, useQueryClient } from "react-query";
import { voteType } from "./types";
import { showMessage } from "./helpers";
import "./styles.scss";

const Vote = ({ setVoted, data, setVoteLoading }: voteType) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(api.createVote, {
    onSuccess: (data) => {
      setVoteLoading(false);
      setVoted(true);
      queryClient.setQueryData(["poll", data.data._id], data);
      showMessage(toast, "success", data.message);
    },
    onError: (error) => {
      const err = error as { message: string };
      setVoted(true);
      setVoteLoading(false);
      showMessage(toast, "info", err.message);
    },
  });

  const castVote = (id: string, optionsId: string) => {
    setVoteLoading(true);
    const voteData = {
      id,
      optionsId,
      clientIp: "124.7.9.33",
    };
    mutate(voteData);
  };

  return (
    <div>
      <div>
        {data.options.map(
          ({ content, id }: { content: string; id: string }) => (
            <button
              disabled={isLoading}
              onClick={() => castVote(data._id, id)}
              key={id}
              id="vote"
            >
              {content}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Vote;
