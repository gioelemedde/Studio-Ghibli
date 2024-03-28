"use client";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import Loader from "@/components/Loader";

interface ProductDetailsProps {
  params: {
    filmId: string;
  };
}

interface Film {
  original_title_romanised: string;
  description: string;
  image: string;
  director: string;
  running_time: string;
  release_date: string;
}

function findId(path: string): string | null {
  const parts = path.split('_');
  if (parts.length === 2) {

    return parts[0];
  } else {

    return path;
  }
}

const Film: FC<ProductDetailsProps> = ({ params }) => {
  const [film, setFilm] = useState<Film>({
    description: "",
    original_title_romanised: "",
    image: "",
    director: "",
    running_time: "",
    release_date: "",
  });
  const getFilm = async () => {
    try {
    const id = findId(params.filmId)
      const data = await fetch(
        `https://ghibliapi.vercel.app/films/${id}`
      ).then((response) => response.json());
      setFilm(data);
    } catch (error) {
      console.error("Errore nel recupero dei dati:", error);
    }
  };

  useEffect(() => {
    getFilm();
  }, []);



  return (
    <>
    {
      film.image ? <> <h1 className="text-3xl uppercase mt-36 text-center text-sky-300 font-bold">
        {film.original_title_romanised}
      </h1>
      <div className="flex justify-center mt-10 zoom">
        <div className=" w-1/4 bg-slate-900 p-3">
          {film.image ? (
            <Image
              src={film.image}
              alt={film.original_title_romanised}
              width={200}
              height={200}
              priority
              unoptimized
              className="w-auto h-auto"
            />
          ) : (
            <div>Immagine in caricamento</div>
          )}
        </div>
        <div className="w-1/4 bg-slate-900 p-3 flex flex-col justify-evenly">
          <p>
            <span className="text-sky-400 font-bold ">Description:</span>{" "}
            {film.description}
          </p>
          <p>
            <span className="text-sky-400 font-bold">Director:</span>{" "}
            {film.director}
          </p>
          <p>
            <span className="text-sky-400 font-bold">Time:</span>{" "}
            {film.running_time}
          </p>
          <p>
            <span className="text-sky-400 font-bold">Relase Date:</span>{" "}
            {film.release_date}
          </p>
          <button className=" border-2 rounded-md border-sky-600 flex justify-center items-center px-4 py-1 hover:bg-sky-600 transition ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 me-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
              />
            </svg>
            Play Film
          </button>
        </div>
      </div>
      </> : <Loader/>
    }
      
    </>
  );
};

export default Film;
