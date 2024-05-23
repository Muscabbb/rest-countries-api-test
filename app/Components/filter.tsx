"use client";

import { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import RegionFiltering from "./regionFiltering";

type Filters = {};

export default function Filter({}: Filters) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const btnValue = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    console.log(btnValue);
  }, [btnValue]);

  return (
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
        className=" bg-transparent w-full focus:outline-none"
        placeholder="Search for a country..."
      />
    </div>
  );
}
