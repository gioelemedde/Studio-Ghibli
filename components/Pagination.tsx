import React, { FC } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (params: any) => void;
  hasNextPage: boolean;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
  hasNextPage,
}) => {
  function handleNextPage() {
    setCurrentPage((prev: any) => prev + 1);
    window.scrollTo({
      top: 0,
    });
  }

  function handlePrevtPage() {
    setCurrentPage((prev: any) => Math.max(prev - 1, 1));
    window.scrollTo({
      top: 0,
    });
  }

  function handleSelectPage(i: number) {
    setCurrentPage(i);
    window.scrollTo({
      top: 0,
    });
  }
  return (
    <div className="flex justify-center my-8">
      <button
        onClick={handlePrevtPage}
        disabled={currentPage === 1}
        className="mx-2 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-no-drop "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z"
          />
        </svg>
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          onClick={() => handleSelectPage(index + 1)}
          className={`transition bg-blue-500 mx-2 hover:bg-white hover:scale-110 hover:text-blue-500 px-4 rounded-md ${
            index + 1 === currentPage
              ? " bg-white text-blue-500 scale-110"
              : " bg-blue-500"
          }`}
          key={index}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={handleNextPage}
        disabled={hasNextPage}
        className="mx-2 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-no-drop"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
