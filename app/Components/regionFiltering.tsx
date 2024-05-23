import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

type FilteringProps = {
  handleClick: (e: any) => void;
  regions: any;
};

const RegionFiltering = ({ handleClick, regions }: FilteringProps) => {
  const [showRegions, setShowRegions] = useState(false);

  return (
    <div className="background-el relative rounded-md ">
      <button
        className="p-3 rounded-md flex justify-between gap-4 cursor-pointer items-center "
        onClick={() => setShowRegions(!showRegions)}
      >
        Filter by Region <IoIosArrowDown />
      </button>
      {showRegions && (
        <div className="background-el w-full  absolute z-30 left-0 -bottom-1 translate-y-full rounded-md shadow-md flex flex-col transition-all gap-2">
          {/* //TODO: HERE */}
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
