import React from "react";
import Header from "./_components/Header";
import Introduction from "./_components/Introduction";

const page = () => {
  return (
    <main className="w-[70%] m-auto flex flex-col gap-10 select-none">
      <Header/>
      <Introduction/>
    </main>
  );
};

export default page;
