// In App.tsx
import { useState } from "react";
import PostsNetwork from "./components/PostsNetwork";
import PostsCacheOnly from "./components/PostsCacheOnly";
import Cache from "./components/Cache";

export default function App() {
  const [view, setView] = useState<"network" | "cache">("cache");

  return (
    <div>
      {/* <Cache /> */}
      <button onClick={() => setView("network")}>Network</button>
      <button onClick={() => setView("cache")}>Cache-only</button>
      {view === "network" ? <PostsNetwork /> : <PostsCacheOnly />}
    </div>
  );
}