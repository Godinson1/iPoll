import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { StatusCodes } from "http-status-codes";
import { promisify } from "util";
import { client } from "../server";
import { v4 } from "uuid";
import { Poll } from "../Models";
import { success, error, handleResponse, PHOTO_URL } from "../utilities";

//Destructure status codes
const { OK, INTERNAL_SERVER_ERROR, NOT_FOUND, BAD_REQUEST } = StatusCodes;

/*
 * NAME - getAllPoll
 * AIM - Get all polls in database
 */
const getAllPoll = async (req: Request, res: Response): Promise<Response> => {
  try {
    const getAsync = promisify(client.get).bind(client);
    const data = await Poll.find({}).sort({ createdAt: -1 });
    const total_app_votes = await getAsync("total_app_votes");

    return res.status(OK).json({
      status: success,
      message: "Polls retieved successfully",
      total_app_votes,
      data,
    });
  } catch (err) {
    console.log(err);
    return handleResponse(
      res,
      error,
      INTERNAL_SERVER_ERROR,
      "Something went wrong"
    );
  }
};

/*
 * NAME - getPoll
 * AIM - Get single poll in database
 */
const getPoll = async (req: Request, res: Response): Promise<Response> => {
  let data;
  try {
    if (!isValidObjectId(req.params.id))
      return handleResponse(res, error, NOT_FOUND, "Poll not found!");

    data = await Poll.findOne({ _id: req.params.id });
    if (!data) return handleResponse(res, error, NOT_FOUND, "Poll not found!");

    const status = data.endDate === "2021-06-02" ? false : true;

    return res.status(OK).json({
      status: success,
      message: status
        ? "Poll retieved successfully but no longer active"
        : "Poll retieved successfully",
      active: status,
      data,
    });
  } catch (err) {
    console.log(err);
    return handleResponse(
      res,
      error,
      INTERNAL_SERVER_ERROR,
      "Something went wrong"
    );
  }
};

/*
 * NAME - createPost
 * AIM - Create new post
 */
const createPoll = async (req: Request, res: Response): Promise<Response> => {
  const { title, creator, category, options, endDate, coverPhoto, status } =
    req.body;

  try {
    const selectedOptions = options.map((content: string) => ({
      id: v4(),
      content,
      count: 0,
    }));

    //Create new poll
    const newPoll = new Poll({
      creator,
      title,
      category,
      endDate,
      options: selectedOptions,
      coverPhoto: coverPhoto ? coverPhoto : PHOTO_URL,
      total_votes: 0,
      status,
    });

    //Save poll to database.
    const data = await newPoll.save();

    return res.status(OK).json({
      status: success,
      message: "Poll created successfully.",
      data,
      viewLink: `http://localhost:3000/poll/${data._id}/view`,
    });
  } catch (err) {
    console.log(err);
    return handleResponse(
      res,
      error,
      INTERNAL_SERVER_ERROR,
      "Something went wrong"
    );
  }
};

/*
 * NAME - editPost
 * AIM - Update existing post
 */
const createVote = async (req: Request, res: Response): Promise<Response> => {
  const { optionsId, clientIp } = req.body;
  let poll;

  const isMemberAsync = promisify(client.sismember).bind(client);
  const incAsync = promisify(client.incr).bind(client);

  if (!clientIp || !optionsId)
    return handleResponse(res, error, NOT_FOUND, "Provide all parameters!");

  try {
    if (!isValidObjectId(req.params.id))
      return handleResponse(res, error, NOT_FOUND, "Poll not found!");

    poll = await Poll.findOne({ _id: req.params.id });
    if (!poll) return handleResponse(res, error, NOT_FOUND, "Poll not found!");

    const validOptionIDs = poll.options.map((cont) => cont.id);
    if (!validOptionIDs.includes(optionsId))
      return handleResponse(res, error, BAD_REQUEST, "Poll option not found");

    const alreadyVoted = await isMemberAsync(req.params.id, clientIp);
    if (alreadyVoted)
      return handleResponse(
        res,
        error,
        BAD_REQUEST,
        "You already voted for this poll!"
      );

    await Poll.updateOne(
      {
        _id: req.params.id,
        "options.id": req.body.optionsId,
      },
      {
        $inc: {
          "options.$.count": 1,
          total_votes: 1,
        },
      }
    );

    const data = await Poll.findOne({ _id: req.params.id });

    //Add user's ip to database
    await client.sadd(req.params.id, clientIp);
    await incAsync(`total_app_votes`);
    return res.status(OK).json({
      status: success,
      message: "You have successfully casted your vote!.",
      data,
    });
  } catch (err) {
    console.log(err);
    return handleResponse(
      res,
      error,
      INTERNAL_SERVER_ERROR,
      "Something went wrong"
    );
  }
};

export { createPoll, createVote, getAllPoll, getPoll };
