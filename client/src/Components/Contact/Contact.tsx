import React, { useState } from "react";
import { Divider, useToast } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useMutation } from "react-query";

import * as api from "../../setup/calls";
import { showMessage } from "../View";
import { CONTACT_FORM } from "./constants";
import "./styles.scss";

const Contact = () => {
  const toast = useToast();
  const [state, setState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const { mutate, isLoading } = useMutation("contact", api.createContact, {
    onSuccess: (data) => {
      showMessage(toast, "success", data.message);
      setState({ name: "", email: "", message: "" });
    },
    onError: (error) => {
      const err = error as { message: string };
      showMessage(toast, "error", err.message);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(state);
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="create"
      >
        <div className="create-form">
          <h1>Want to customize a poll or send a message? </h1>
          <Divider />
          <br />
          <form onSubmit={handleSubmit}>
            {CONTACT_FORM.map((data) => {
              const { name, type, className, label } = data;
              return (
                <div key={name}>
                  {type === "input" ? (
                    <div>
                      <label>{label}</label>
                      <input
                        onChange={handleChange}
                        required
                        name={name}
                        value={name === "name" ? state.name : state.email}
                        placeholder={label}
                        className="cinput"
                      />
                    </div>
                  ) : (
                    <div>
                      <label>{label}</label>
                      <textarea
                        required
                        rows={5}
                        cols={33}
                        onChange={handleChange}
                        name={name}
                        value={state.message}
                        placeholder={label}
                        className={className}
                      />
                    </div>
                  )}
                </div>
              );
            })}
            <button disabled={isLoading} type="submit" className="btn-create">
              {isLoading ? "Submitting..." : "Submit Message"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
