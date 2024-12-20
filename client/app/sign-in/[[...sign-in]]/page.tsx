import { SignIn } from "@clerk/nextjs";

const page = () => {
  return (
    <main className="w-full h-screen flex justify-around items-center flex-wrap gap-5">
      <div className="flex flex-col justify-center items-start ">
        <h2 className="font-semibold text-lg">Welcome To</h2>
        <h1 className="font-bold text-5xl">
          HEX<span className="text-primary">CODE</span>
        </h1>
        <h3>
          Developed  by <span className="text-primary">Hex code team</span>
        </h3>
      </div>
      <SignIn routing="hash" />
    </main>
  );
};

export default page;
