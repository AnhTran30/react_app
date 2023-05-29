import logo from "./logo.svg";
import "./App.css";

import React from "react";
import { BrowserRouter } from "react-router-dom";
import NavigationBar from "./shared/navigation-bar";
import Container from "@material-ui/core/Container";
import Router from "./router";

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Container>
        <Router />
      </Container>
    </BrowserRouter>
  );
}

export default App;
