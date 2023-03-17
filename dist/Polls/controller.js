"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPoll = exports.getAllPoll = exports.createVote = exports.createPoll = void 0;
const mongoose_1 = require("mongoose");
const http_status_codes_1 = require("http-status-codes");
const util_1 = require("util");
const server_1 = require("../server");
const uuid_1 = require("uuid");
const Models_1 = require("../Models");
const utilities_1 = require("../utilities");
//Destructure status codes
const { OK, INTERNAL_SERVER_ERROR, NOT_FOUND, BAD_REQUEST } = http_status_codes_1.StatusCodes;
/*
 * NAME - getAllPoll
 * AIM - Get all polls in database
 */
const getAllPoll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAsync = util_1.promisify(server_1.client.get).bind(server_1.client);
        const data = yield Models_1.Poll.find({}).sort({ createdAt: -1 });
        const total_app_votes = yield getAsync("total_app_votes");
        return res.status(OK).json({
            status: utilities_1.success,
            message: "Polls retieved successfully",
            total_app_votes,
            data,
        });
    }
    catch (err) {
        console.log(err);
        return utilities_1.handleResponse(res, utilities_1.error, INTERNAL_SERVER_ERROR, "Something went wrong");
    }
});
exports.getAllPoll = getAllPoll;
/*
 * NAME - getPoll
 * AIM - Get single poll in database
 */
const getPoll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data;
    try {
        if (!mongoose_1.isValidObjectId(req.params.id))
            return utilities_1.handleResponse(res, utilities_1.error, NOT_FOUND, "Poll not found!");
        data = yield Models_1.Poll.findOne({ _id: req.params.id });
        if (!data)
            return utilities_1.handleResponse(res, utilities_1.error, NOT_FOUND, "Poll not found!");
        const status = data.endDate === "2021-06-02" ? false : true;
        return res.status(OK).json({
            status: utilities_1.success,
            message: status
                ? "Poll retieved successfully but no longer active"
                : "Poll retieved successfully",
            active: status,
            data,
        });
    }
    catch (err) {
        console.log(err);
        return utilities_1.handleResponse(res, utilities_1.error, INTERNAL_SERVER_ERROR, "Something went wrong");
    }
});
exports.getPoll = getPoll;
/*
 * NAME - createPost
 * AIM - Create new post
 */
const createPoll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, creator, category, options, endDate, coverPhoto, status } = req.body;
    try {
        const selectedOptions = options.map((content) => ({
            id: uuid_1.v4(),
            content,
            count: 0,
        }));
        //Create new poll
        const newPoll = new Models_1.Poll({
            creator,
            title,
            category,
            endDate,
            options: selectedOptions,
            coverPhoto: coverPhoto ? coverPhoto : utilities_1.PHOTO_URL,
            total_votes: 0,
            status,
        });
        //Save poll to database.
        const data = yield newPoll.save();
        return res.status(OK).json({
            status: utilities_1.success,
            message: "Poll created successfully.",
            data,
            viewLink: `http://localhost:3000/poll/${data._id}/view`,
        });
    }
    catch (err) {
        console.log(err);
        return utilities_1.handleResponse(res, utilities_1.error, INTERNAL_SERVER_ERROR, "Something went wrong");
    }
});
exports.createPoll = createPoll;
/*
 * NAME - editPost
 * AIM - Update existing post
 */
const createVote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { optionsId, clientIp } = req.body;
    let poll;
    const isMemberAsync = util_1.promisify(server_1.client.sismember).bind(server_1.client);
    const incAsync = util_1.promisify(server_1.client.incr).bind(server_1.client);
    if (!clientIp || !optionsId)
        return utilities_1.handleResponse(res, utilities_1.error, NOT_FOUND, "Provide all parameters!");
    try {
        if (!mongoose_1.isValidObjectId(req.params.id))
            return utilities_1.handleResponse(res, utilities_1.error, NOT_FOUND, "Poll not found!");
        poll = yield Models_1.Poll.findOne({ _id: req.params.id });
        if (!poll)
            return utilities_1.handleResponse(res, utilities_1.error, NOT_FOUND, "Poll not found!");
        const validOptionIDs = poll.options.map((cont) => cont.id);
        if (!validOptionIDs.includes(optionsId))
            return utilities_1.handleResponse(res, utilities_1.error, BAD_REQUEST, "Poll option not found");
        const alreadyVoted = yield isMemberAsync(req.params.id, clientIp);
        if (alreadyVoted)
            return utilities_1.handleResponse(res, utilities_1.error, BAD_REQUEST, "You already voted for this poll!");
        yield Models_1.Poll.updateOne({
            _id: req.params.id,
            "options.id": req.body.optionsId,
        }, {
            $inc: {
                "options.$.count": 1,
                total_votes: 1,
            },
        });
        const data = yield Models_1.Poll.findOne({ _id: req.params.id });
        //Add user's ip to database
        yield server_1.client.sadd(req.params.id, clientIp);
        yield incAsync(`total_app_votes`);
        return res.status(OK).json({
            status: utilities_1.success,
            message: "You have successfully casted your vote!.",
            data,
        });
    }
    catch (err) {
        console.log(err);
        return utilities_1.handleResponse(res, utilities_1.error, INTERNAL_SERVER_ERROR, "Something went wrong");
    }
});
exports.createVote = createVote;
