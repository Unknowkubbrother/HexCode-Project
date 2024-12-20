import { SignUp } from "@clerk/nextjs";

const page = () => {
  return (
    <main className="w-full h-screen flex justify-around items-center">
      <div className="flex flex-col justify-center items-start">
        <h2 className="font-semibold text-lg">Welcome To</h2>
        <h1 className="font-bold text-5xl">
          HEX<span className="text-primary">CODE</span>
        </h1>
        <h3>
            Development by <span className="text-primary">Team hex code</span>
        </h3>
      </div>
        <SignUp routing="hash" />
    </main>
  );
};

export default page;
