import React, { useState } from "react";
import "./index.css";
import { TwitterFollowCard } from "./TwitterFollowCard";
import "./App.css";

export function App() {
  const [isFollowing, setIsFollowing] = useState(false)
  return (
    <section className="App">
      <TwitterFollowCard userName="_0dr" initialIsFollowing={true}>
        Daniel Ramirez
      </TwitterFollowCard>
      <TwitterFollowCard userName="midudev" initialIsFollowing={true}>
        Midudev
      </TwitterFollowCard>
      <TwitterFollowCard userName="dog">
        Dog
      </TwitterFollowCard>
      <TwitterFollowCard userName="cat">
        Cat
      </TwitterFollowCard>
    </section>
  );
}
