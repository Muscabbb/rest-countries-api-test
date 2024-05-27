"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function DetailsPage({
  params,
}: {
  params: { countryDetails: string };
}) {
  const [data, setData] = useState([]);
  const [currentCountry, setCurrentCountry] = useState<any>([]);

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

  const borders = data.map((country) => {
    currentCountry.map((current: any) => {
      console.log(country.alpha3Code.includes(current.borders));
      console.log(current.borders.join(","));
      console.log(country.name);
    });
    return (
      <div key={country.name} className="">
        is it workin
      </div>
    );
  });

  return (
    <div className="container mt-[80px] pb-14 mx-auto flex flex-col">
      <Link
        href={"/"}
        className="background-el py-3  rounded shadow my-10 flex items-center justify-center w-32"
      >
        <FaArrowLeftLong className=" mr-3" />
        <span>Back</span>
      </Link>
      <div className="flex items-center justify-between">
        <div className="img basis-2/5">
          <img
            src={currentCountry?.flags?.svg}
            alt="good shit"
            className="w-full h-full"
          />
        </div>
        <div className="flex basis-2/4 flex-col gap-8">
          <div className="flex items-center justify-between">
            <div className=" space-y-1">
              <h1 className=" font-bold text-3xl mb-5">
                {currentCountry.name}
              </h1>
              <p className=" font-light">
                <span className=" capitalize font-medium">Native Name: </span>
                {currentCountry.nativeName}
              </p>
              <p className=" font-light">
                <span className=" capitalize font-medium">Population: </span>
                {currentCountry.population}
              </p>
              <p className=" font-light">
                <span className=" capitalize font-medium">region: </span>
                {currentCountry.region}
              </p>
              <p className=" font-light">
                <span className=" capitalize font-medium">sub region: </span>
                {currentCountry.subRegion}
              </p>
              <p className=" font-light">
                <span className=" capitalize font-medium">capital: </span>
                {currentCountry.capital}
              </p>
            </div>
            <div className="space-y-1 basis-2/4">
              <p className=" font-light">
                <span className=" capitalize font-medium">
                  top level domain:{" "}
                </span>
                {currentCountry.topLevelDomain}
              </p>
              <p className=" font-light">
                <span className=" capitalize font-medium">currencies: </span>
                {currentCountry.currencies
                  .map((currency) => currency.name)
                  .join(",")}
              </p>
              <p className=" font-light">
                <span className=" capitalize font-medium">Languages: </span>
                {currentCountry.languages.map((lang) => lang.name).join(",")}
              </p>
            </div>
          </div>
          <div className="borders flex items-center gap-2">
            <h2 className=" capitalize">Border countries:</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
import Link from "next/link";
