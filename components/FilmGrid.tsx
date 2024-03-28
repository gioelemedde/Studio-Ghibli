"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Loader from "./Loader";
import Pagination from "./Pagination";
import Link from "next/link";

type Film = {
  id: string;
  original_title_romanised: string;
  description: string;
  image: string;
  director: string;
};

const FilmGrid = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [films, setFilms] = useState<Film[]>([]);
  const [data, setData] = useState<Film[]>([]);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const hasNextPage = totalPages === currentPage;

  const getFilms = async () => {
    try {
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const data = await fetch("https://ghibliapi.vercel.app/films").then(
        (response) => response.json()
      );
      setData(data);
      const filmsForPage = data.slice(start, end);
      setFilms(filmsForPage);
    } catch (error) {
      console.error("Errore nel recupero dei dati:", error);
    }
  };

  useEffect(() => {
    getFilms();
  }, [currentPage]);

  function truncateTextWord(text: string, maxWords: number): string {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ");
    }
    return text;
  }

  function truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  }

  return (
    <>
      {films.length === 0 ? (
        <Loader />
      ) : (
        <>
          <div className="grid grid-cols-3 gap-1 overflow-hidden">
            {films.map((film) => (
              <div key={film.id} className="my-4 p-4 ">
                <article className="flex shadow-xl rounded-lg  bg-slate-900 card ">
                  <div className=" w-2/5">
                    <Image
                      src={film.image}
                      alt={film.original_title_romanised}
                      unoptimized
                      width={300}
                      height={300}
                      priority
                      className="rounded-lg w-auto h-auto "
                    />
                  </div>
                  <div className="w-3/5 p-3 flex flex-col justify-between items-start ">
                    <h2 className="text-2xl text-sky-500 mx-auto uppercase ">
                      {truncateTextWord(film.original_title_romanised, 2)}
                    </h2>
                    <div>
                      <p>
                        <span className="text-sky-300">Director:</span>{" "}
                        {film.director}
                      </p>
                      <p className=" mt-3">
                        <span className="text-sky-300">Description:</span>{" "}
                        {truncateText(film.description, 90)}
                      </p>
                    </div>
                    <Link href={`/films/${film.id}_${film.original_title_romanised}`}>
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
                      watch trailer
                    </button>
                    </Link>
                  </div>
                </article>
              </div>
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            hasNextPage={hasNextPage}
          />
        </>
      )}
    </>
  );
};

export default FilmGrid;
