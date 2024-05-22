"use client";
import { Suspense, useEffect, useState } from "react";
import Filter from "./Components/filter";
import NavBar from "./Components/navbar";
import RestCountries from "./Components/countries/restCountries";
import Link from "next/link";
import CountriesLoading from "./loading";
import axios from "axios";
import ErrorPage from "./error";

type Theme = "light" | "dark";

type FilteredData = {
  namesOfCountries: string[];
  countriesRegion: string[];
  countryBorders: string[];
};

//TODO: add next theme

export default function Home() {
  const [theme, setTheme] = useState<Theme>("light");
  const [data, setData] = useState([]);
  const filteredData: FilteredData = {
    namesOfCountries: [],
    countriesRegion: [],
    countryBorders: [],
  };

  useEffect(() => {
    setTheme(localStorage.getItem("theme") as Theme);

    const apiCall = async () => {
      //TODO: this has to work by region filter and name search filter by using conditions fetch

      const data = await axios("/data.json");

      setData(data.data);
    };
    apiCall();
  }, []);

  const allCountries = data
    .sort(() => Math.random() - 0.5)
    .map((country: any) => {
      filteredData.namesOfCountries.push(country.name);
      filteredData.countriesRegion.push(country.region);
      filteredData.countryBorders.push(country.borders);

      return (
        <Link key={country.name} href={`./${country.name}`}>
          <RestCountries
            key={country.name}
            countryName={country.name}
            src={country.flag}
            alt={`${country.name} image`}
            population={country.population}
            region={country.region}
            capital={country?.capital}
          />
        </Link>
      );
    });
  const countryLoading = <CountriesLoading />;

  return (
    <>
      <NavBar theme={theme} setTheme={setTheme} />
      <div className="container mt-[80px] mx-auto flex flex-col gap-8 items-center">
        <Filter />
        <Suspense fallback={<CountriesLoading />}>
          <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {allCountries}
          </div>
        </Suspense>
      </div>
    </>
  );
}
