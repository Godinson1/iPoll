import React from "react";
import { Switch, Route } from "react-router-dom";
import { ViewportProvider } from "./utilities";
import Landing from "./Components/Landing";
import Faqs from "./Components/Faqs";
import Contact from "./Components/Contact";
import ViewAllPoll, { ViewPoll } from "./Components/View";
import CreatePoll, { Success } from "./Components/Create";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./Navbar";

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <ViewportProvider>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/create" component={CreatePoll} />
            <Route exact path="/polls" component={ViewAllPoll} />
            <Route exact path="/poll/:id/view" component={ViewPoll} />
            <Route exact path="/faqs" component={Faqs} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/create/success" component={Success} />
          </Switch>
        </ViewportProvider>
      </ChakraProvider>
    </div>
  );
}

export default App;
