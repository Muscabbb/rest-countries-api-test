"use client";
import { Dispatch, SetStateAction} from "react";
import { BsMoon } from "react-icons/bs";
import { FaMoon } from "react-icons/fa";



export default function NavBar({theme, setTheme}: {theme: "light" | "dark", setTheme: Dispatch<SetStateAction<"light" | "dark">>}) {
  

  return (
    <div className="background-el w-full h-[70px] fixed top-0 left-0 z-10 shadow-md">
      <div className="container mx-auto h-full flex justify-between items-center">
        <h1 className=" font-bold tracking-wide capitalize text-sm md:text-2xl">
          Where in the world?
        </h1>
        {theme === "light" && (
          <div
            className="theme-toggler cursor-pointer flex items-center gap-1"
            onClick={() => setTheme("dark")}
          >
            <BsMoon />

            <span className="capitalize text-sm ">dark mode</span>
          </div>
        )}

        {theme === "dark" && (
          <div
            className="theme-toggler cursor-pointer flex items-center gap-1"
            onClick={() => setTheme("light")}
          >
            <FaMoon />

            <span className="capitalize text-sm">dark mode</span>
          </div>
        )}
      </div>
    </div>
  );
}
