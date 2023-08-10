import React from "react";
import "./index.css";
import { TwitterFollowCard } from "./TwitterFollowCard";
import "./App.css";

export function App() {
  const formattedUserName = <span>@_0dr1</span>
  return (
    <section className='App'>
    <TwitterFollowCard formattedUserName={formattedUserName} isFollowing={true} name="Daniel Ramirez" userName="_0dr" />
    <TwitterFollowCard formattedUserName={formattedUserName} isFollowing={false} name="Daniel Ramirez" userName="midudev" />
    <TwitterFollowCard formattedUserName={formattedUserName} isFollowing={true} name="Daniel Ramirez" userName="midudev" />
    <TwitterFollowCard formattedUserName={formattedUserName} isFollowing name="Daniel Ramirez" userName="midudev" />
     </section>
  )
}