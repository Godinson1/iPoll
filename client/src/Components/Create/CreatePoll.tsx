import React, { useState } from "react";
import { Checkbox, Divider, useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";
import { motion } from "framer-motion";

import { CATEGORIES, TIME_SPAN } from "./constants";
import { showMessage } from "../View/helpers";
import * as api from "../../setup/calls";
import Success from "./Success";
import "./styles.scss";

const CreatePoll = () => {
  const [status, setStatus] = useState(false);
  const [formCount, setFormCount] = useState(0);
  const [state, setState] = useState({
    creator: "",
    title: "",
    category: "",
    timeSpan: "",
    optionOne: "",
    optionTwo: "",
    optionThree: "",
    optionFour: "",
  });
  const toast = useToast();

  const { data, isLoading, mutate } = useMutation(api.createPoll, {
    onSuccess: (data) => {
      showMessage(toast, "success", data.message);
    },
    onError: (error) => {
      const err = error as { message: string };
      showMessage(toast, "error", err.message);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const optionStrings = `${state.optionOne},${state.optionTwo},${
      formCount === 0 ? "" : state.optionThree
    },${formCount === 1 ? "" : state.optionFour}`;
    const options = optionStrings.split(",").filter((option) => option);
    const pollData = {
      creator: state.creator,
      title: state.title,
      category: state.category,
      endDate: state.timeSpan,
      coverPhoto: "",
      status: status ? "Private" : "Public",
      options,
    };
    mutate(pollData);
  };

  return (
    <div>
      {data && data.data ? (
        <Success data={data} />
      ) : (
        <div className="create">
          <motion.div
            transition={{ delay: 0.3, duration: 0.3 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="create-form"
          >
            <h1>Create Poll</h1>
            <Divider />
            <form onSubmit={handleSubmit}>
              <div className="create-header">
                <div className="select-con">
                  <select
                    name="category"
                    onChange={handleChange}
                    className="cselect"
                  >
                    {CATEGORIES.map(({ title, value }) => (
                      <option key={title} value={value}>
                        {title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  {/*<button className="btn-create">Add Photo</button>*/}
                </div>
              </div>
              <label>Name</label>
              <input
                onChange={handleChange}
                name={"creator"}
                placeholder="Creator Name"
                className="cinput"
                required
              />
              <label>Title of Poll</label>
              <input
                onChange={handleChange}
                name={"title"}
                placeholder="Poll title"
                className="cinput"
                required
              />
              <label>Time Span</label>
              <div className="flex-start">
                <select
                  name="timeSpan"
                  onChange={handleChange}
                  id="time-span"
                  required
                  className="cselect-time"
                >
                  {TIME_SPAN.map(({ title, value }) => (
                    <option key={title} value={value}>
                      {title}
                    </option>
                  ))}
                </select>
              </div>
              <br /> <br />
              <Divider />
              <br />
              <label>Option 1</label>
              <input
                onChange={handleChange}
                name="optionOne"
                required
                placeholder="Option one"
                className="cinput"
              />
              <label>Option 2</label>
              <input
                onChange={handleChange}
                name="optionTwo"
                required
                placeholder="Option two"
                className="cinput"
              />
              {formCount !== 0 && (
                <motion.div
                  transition={{ delay: 0.2, duration: 0.2 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <label>Option 3</label>
                  <input
                    onChange={handleChange}
                    name="optionThree"
                    placeholder="Option three"
                    className="cinput"
                  />
                </motion.div>
              )}
              {formCount > 1 && (
                <motion.div
                  transition={{ delay: 0.2, duration: 0.2 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <label>Option 4</label>
                  <input
                    onChange={handleChange}
                    name="optionFour"
                    placeholder="Option four"
                    className="cinput"
                  />
                </motion.div>
              )}
              <div className="action">
                <button
                  disabled={formCount === 2}
                  className="btn-add"
                  onClick={() => setFormCount(formCount + 1)}
                >
                  +
                </button>
                {formCount !== 0 && (
                  <button
                    disabled={formCount === 0}
                    className="btn-add red"
                    onClick={() => setFormCount(formCount - 1)}
                  >
                    -
                  </button>
                )}
              </div>
              <br />
              <div>
                <Checkbox
                  checked={status}
                  onChange={() => setStatus(!status)}
                  size="md"
                  colorScheme="green"
                >
                  Private
                </Checkbox>
              </div>
              <div>
                <button
                  disabled={isLoading}
                  type="submit"
                  className="btn-create"
                >
                  {isLoading ? "Loading..." : "Create Poll"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CreatePoll;
