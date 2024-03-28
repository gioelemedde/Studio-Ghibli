import Link from "next/link";
import Button from "./Button";

const Initial =() => {
    return (<header className="w-full h-screen bg-cover bg-center flex flex-col justify-center items-center">
        <h1 className=" text-[8rem] mb-5">STUDIO GHIBLI</h1>
        <Link href='/films'><Button transparent={false}>Scopri tutti i Film</Button></Link> 
    </header> );
}

export default Initial;