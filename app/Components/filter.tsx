"use client";

import { useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";

export default function Filter() {
  const [showRegions, setShowRegions] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [btnValue, setBtnValue] = useState("");
  return (
    <div className="w-full flex flex-col items-start py-5 px-3 md:px-0 gap-2 md:flex-row md:justify-between  md:items-center bg-transparent">
      <div className="search background-el cursor-pointer w-full md:w-auto  rounded flex items-center text-sm md:text-lg lg:text-xl shadow-md">
        <span
          className="search-menu p-3 rounded"
          onClick={() => inputRef.current?.focus()}
        >
          <CiSearch />
        </span>
        <input
          ref={inputRef}
          type="text"
          className=" bg-transparent focus:outline-none"
          placeholder="Search for a country..."
        />
      </div>
      <div className="background-el relative rounded-md ">
        <button
          value={btnValue}
          className="p-3 rounded-md flex justify-between gap-4 cursor-pointer items-center "
          onClick={() => setShowRegions(!showRegions)}
        >
          Filter by Region <IoIosArrowDown />
        </button>
        {showRegions && (
          <div className="background-el w-full  absolute z-30 left-0 -bottom-1 translate-y-full rounded-md shadow-md flex flex-col transition-all gap-2">
            <button className=" p-3 border-b-0 hover:border-b-2 transition border-slate-600 dark:border-gray-400 text-start">
              Africa
            </button>
            <button className=" p-3 border-b-0 hover:border-b-2 transition border-slate-600 dark:border-gray-400 text-start">
              Asia
            </button>
            <button className=" p-3 border-b-0 hover:border-b-2 transition border-slate-600 dark:border-gray-400 text-start">
              Europe
            </button>
            <button className=" p-3 border-b-0 hover:border-b-2 transition border-slate-600 dark:border-gray-400 text-start">
              America
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
