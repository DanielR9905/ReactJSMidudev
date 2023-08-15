import "./index.css";
import { TwitterFollowCard } from "./TwitterFollowCard";
import "./App.css";

const users = [
  {
    userName: "midudev",
    name: "Miguel Angel Duran",
    isFollowing: true,
  },
  {
    userName: "pheralb",
    name: "Pablo H.",
    isFollowing: false,
  },
  {
    userName: "_0dr",
    name: "Daniel R",
    isFollowing: true,
  },
  {
    userName: "dog",
    name: "Dog R",
    isFollowing: false,
  },
  {
    userName: "cat",
    name: "Cat R",
    isFollowing: false,
  },
];

export function App() {
  return (
    <section className="App">
      {users.map(({ userName, name, isFollowing }) => (
        <TwitterFollowCard
          key={userName}
          userName={userName}
          initialIsFollowing={isFollowing}
        >
          {name}
        </TwitterFollowCard>
      ))}
    </section>
  );
}
