import React, { FC } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./landing.scss";

const Landing: FC = () => {
  return (
    <div>
      <div className="landing">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, y: 50, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          id="triangle-right"
        ></motion.div>
        <div className="main">
          <motion.div
            transition={{ delay: 0.5, duration: 0.5 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h1>
              You want to know what people{" "}
              <span className="secondary">think</span> about that idea, thought
              or opinion<span className="secondary">?</span>
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="secondary icon"
          >
            &#8595;
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <Link to="/create" id="link">
              <button className="btn-create">Create Poll</button>
            </Link>
          </motion.div>
        </div>
        <div style={{ visibility: "hidden" }} id="triangle-right"></div>
      </div>
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.9 }}
        className="center"
      >
        <div id="triangle-up"></div>
      </motion.div>
    </div>
  );
};

export default Landing;
