import Image from "next/image";

const Loading = () => {
    return ( 
    <main className="w-full h-screen flex justify-center items-center">
        <Image src="/logo.svg" alt="loading" width={50} height={50} className="Loading" />
    </main>
     );
}
 
export default Loading;