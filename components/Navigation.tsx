
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
const Navigation = () => {
  return (
    <nav className="grid grid-cols-12 bg-slate-900  p-1.5 px-3 fixed top-0 w-full z-50">
      <div className=" col-span-1">
        <Image
        className=" w-auto h-auto  "
          src={"/img/logo.png"}
          alt="logo"
          priority
         width={45}
         height={30}
        />
      </div>
      <div className=" col-span-2   flex justify-between items-center">
        <Link className="hover:text-sky-600 font-bold" href='/'>Home</Link>
        <Link className="hover:text-sky-600 font-bold" href='/films'>Film</Link>
        <Link className="hover:text-sky-600 font-bold" href='/'>About</Link>
      </div>
      <div className="col-span-9 gap-6 flex justify-end items-center">
       <Button transparent={false}>Accedi</Button>
       <Button transparent={true}>Registrati</Button>
      </div>
    </nav>
  );
};

export default Navigation;
