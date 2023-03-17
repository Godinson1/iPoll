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
exports.createContact = void 0;
const http_status_codes_1 = require("http-status-codes");
const Models_1 = require("../Models");
const utilities_1 = require("../utilities");
//Destructure status codes
const { OK, INTERNAL_SERVER_ERROR } = http_status_codes_1.StatusCodes;
/*
 * NAME - createContact
 * AIM - Create new contact
 */
const createContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, message } = req.body;
    try {
        const newContact = new Models_1.Contact({
            name,
            email,
            message,
        });
        const data = yield newContact.save();
        return res.status(OK).json({
            status: utilities_1.success,
            message: "Message sent successfully.",
            data,
        });
    }
    catch (err) {
        console.log(err);
        return utilities_1.handleResponse(res, utilities_1.error, INTERNAL_SERVER_ERROR, "Something went wrong");
    }
});
exports.createContact = createContact;
