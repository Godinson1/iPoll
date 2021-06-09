import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Contact } from "../Models";
import { success, error, handleResponse } from "../utilities";

//Destructure status codes
const { OK, INTERNAL_SERVER_ERROR } = StatusCodes;

/*
 * NAME - createContact
 * AIM - Create new contact
 */
const createContact = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { name, email, message } = req.body;

  try {
    const newContact = new Contact({
      name,
      email,
      message,
    });

    const data = await newContact.save();

    return res.status(OK).json({
      status: success,
      message: "Contact created successfully.",
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

export { createContact };
