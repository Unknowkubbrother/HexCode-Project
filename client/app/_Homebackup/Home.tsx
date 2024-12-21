import React from "react";
import Challenges from "./_components/Challenges";
import Problems from "./_components/Problems";

const Home = () => {
  return (
    <main className="w-[70%] m-auto flex flex-col gap-10">
      <Challenges/>
      <Problems/>
    </main>
  );
};

export default Home;
