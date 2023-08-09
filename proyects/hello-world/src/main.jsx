import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { TwitterFollowCard } from "./TwitterFollowCard";
import "./App.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <section className='App'>
      <TwitterFollowCard name="Daniel Ramirez" userName="_0dr" />
      <TwitterFollowCard name="Daniel Ramirez" userName="midudev" />
    </section>
  </>
);
