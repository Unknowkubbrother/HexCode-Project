import React from "react";
import { CodeBlock } from "@/components/ui/code-block";

const code = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Introduction</title>
            <link rel="stylesheet" href="styles.css">
        </head>
        <body>
            <header>
                <h1>HEX<span class="text-primary">CODE</span></h1>
                <p></p>A platform to learn and practice programming for everyone</p>
            </header>
        </body>
    </html>
  `;

const Introduction = () => {
  return (
    <section
      id="introduction"
      className="w-full flex justify-between items-start h-screen"
    >
      <div className="flex flex-col gap-5">
        <h2 className="text-2xl text-[#9CA3AF] font-semibold">INTRODUCTION</h2>
        <h1 className="text-5xl font-bold">
          Desgin for
          <span className="text-primary ml-2">Everyone</span>
        </h1>
        <p className="text-lg text-[#9CA3AF]">
            A platform to learn and practice programming for everyone
        </p>
      </div>

      <div className="w-[57%]">
        <CodeBlock
            language="html"
            filename="Introduction.html"
            highlightLines={[13,14]}
            code={code}
            className="drop-shadow-lg"
        />
      </div>
    </section>
  );
};

export default Introduction;
