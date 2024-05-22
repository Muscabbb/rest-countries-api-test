"use client";
import { useEffect, useState } from "react";
import Filter from "./Components/filter";
import NavBar from "./Components/navbar";
import RestCountries from "./Components/restCountries";
import Link from "next/link";

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
      const res = await fetch(`https://restcountries.com/v3.1/all`, {
        method: "GET",
        next: {
          revalidate: 120,
        },
      });
      const data = await res.json();
      setData(data);
    };
    apiCall();
  }, []);

  const allCountries = data
    .sort(() => Math.random() - 0.5)
    .map((country: any) => {
      filteredData.namesOfCountries.push(country.name.common);
      filteredData.countriesRegion.push(country.region);
      filteredData.countryBorders.push(country.borders);

      return (
        <Link key={country.name?.common} href={`./${country.name?.common}`}>
          <RestCountries
            key={country.name?.common}
            countryName={country.name?.common}
            src={country.flags?.svg}
            alt={country.flags?.alt}
            population={country.population}
            region={country.region}
            capital={country?.capital}
          />
        </Link>
      );
    });

  return (
    <>
      <NavBar theme={theme} setTheme={setTheme} />
      <div className="container mt-[80px] mx-auto flex flex-col gap-8 items-center">
        <Filter />
        <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {allCountries}
        </div>
      </div>
    </>
  );
}
