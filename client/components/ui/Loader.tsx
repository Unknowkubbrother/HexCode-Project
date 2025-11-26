import Image from "next/image";

const Loader = () => {
    return ( 
    <main className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
        <Image src="/logo.svg" alt="loading" width={50} height={50} className="Loading" />
    </main>
     );
}
 
export default Loader;