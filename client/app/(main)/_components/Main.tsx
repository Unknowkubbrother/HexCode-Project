import React from "react";
import Header from "./Header";
import Introduction from "./Introduction";

const Main = () => {
  return (
    <main className="w-[70%] m-auto flex flex-col gap-10 select-none">
      <Header/>
      <Introduction/>
    </main>
  );
};

export default Main;
