import React from "react";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionIcon,
  Divider,
  Box,
  AccordionPanel,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FAQS, FAQ_HEADER } from "./constants";

const Faqs = () => {
  return (
    <div>
      <div className="create">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="create-form"
        >
          <h1>{FAQ_HEADER}</h1>
          <Divider />
          <Accordion allowToggle>
            {FAQS.map((data) => {
              const { answer, title } = data;
              return (
                <AccordionItem key={title}>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        {title}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel textAlign="left" pb={4}>
                    {answer}
                  </AccordionPanel>
                </AccordionItem>
              );
            })}
          </Accordion>
        </motion.div>
      </div>
    </div>
  );
};

export default Faqs;
