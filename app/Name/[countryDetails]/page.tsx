"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from "axios";

export default function DetailedCountry({
  params,
}: {
  params: { countryDetails: string };
}) {
  const [data, setData] = useState([]);
  const [currentCountry, setCurrentCountry] = useState([]);

  useEffect(() => {
    //Fetching data
    const apiCall = async (id: string) => {
      //TODO: this has to work by region filter and name search filter by using conditions fetch

      const data = await axios("/data.json");

      data.data.map((country: any) => {
        if (country.name === id) {
          setCurrentCountry(country);
        }
      });
      setData(data.data);
    };
    apiCall(params.countryDetails);
  }, []);

  const allBorders = data.map((country: any) => {
    if (country.alpha3Code.includes(currentCountry.borders)) {
      return (
        <Link
          key={country.name}
          href={`Name/${country.name}`}
          className="bg-element shadow-lg p-2 rounded"
        >
          {country.nam}
        </Link>
      );
    }
  });

  return (
    <div className="container mt-[80px] mx-auto flex flex-col gap-8">
      <div className="py-10 bg-transparent ">
        <Link href={"/"}>
          <button className="go-back flex items-center gap-5 background-el py-3 px-7 rounded-sm cursor-pointer shadow-lg   ">
            <FaArrowLeftLong />
            back
          </button>
        </Link>
      </div>

      <div className="country-holder bg-transparent flex flex-col md:flex-row md:items-center justify-between h-4/5 py-5 gap-3 ">
        <div className="img relative h-2/6 md:h-full basis-1/3">
          <img src={currentCountry.flag} alt="good shit" />
        </div>
        <div className="flex flex-col px-4 md:px-0 md:basis-3/5 gap-8 bg-transparent">
          <div className="flex flex-col md:flex-row md:items-center justify-between bg-transparent">
            <div className=" space-y-2 bg-transparent">
              <h1 className="mb-5 bg-transparent text-3xl">
                {currentCountry.name}
              </h1>
              <p className="bg-transparent">
                Native Name: {currentCountry.nativeName}
              </p>
              <p className="bg-transparent capitalize">
                population: {currentCountry.population}
              </p>
              <p className="bg-transparent capitalize">
                sub region: {currentCountry.subregion}
              </p>
              <p className="bg-transparent capitalize">
                Capital: {currentCountry.capital}
              </p>
            </div>
            <div className="space-y-2 bg-transparent basis-1/2">
              <span className="bg-transparent capitalize">
                top level domain: {currentCountry.topLevelDomain}
              </span>
              <span className="bg-transparent capitalize">
                currencies: {currentCountry.currencies?.name}
              </span>
              <span className="bg-transparent capitalize">
                languages: {currentCountry.languages?.name}
              </span>
            </div>
          </div>
          <div className="flex items-center bg-transparent gap-2">
            <h1 className="bg-transparent">Border Countries:</h1>
            allBorders
          </div>
        </div>
      </div>
    </div>
  );
}
