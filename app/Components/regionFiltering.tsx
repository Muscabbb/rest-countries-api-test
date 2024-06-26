import { Dispatch, SetStateAction, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

type FilteringProps = {
  handleClick: (e: any) => void;
  regions: any;
  showRegions: boolean;
  setShowRegions: Dispatch<SetStateAction<boolean>>;
};

const RegionFiltering = ({
  handleClick,
  regions,
  showRegions,
  setShowRegions,
}: FilteringProps) => {
  return (
    <div className="background-el relative rounded-md ">
      <button
        className="p-3 rounded-md flex justify-between gap-4 cursor-pointer items-center "
        onClick={() => setShowRegions(!showRegions)}
      >
        Filter by Region {showRegions ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </button>
      {showRegions && (
        <div className="background-el w-full  absolute z-30 left-0 -bottom-1 translate-y-full rounded-md shadow-md flex flex-col transition-all gap-2">
          {[...regions].map((region: any, i: number) => (
            <button
              key={i}
              className=" p-3 border-b-0 hover:border-b-2 transition border-slate-600 hover:bg-slate-500 text-start"
              onClick={(e) => handleClick(e)}
            >
              {region}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default RegionFiltering;
