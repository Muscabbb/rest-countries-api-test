"use client";
import { Suspense, useEffect, useState } from "react";
import Filter from "./Components/filter";
import RestCountries from "./Components/countries/restCountries";
import Link from "next/link";
import CountriesLoading from "./loading";
import axios from "axios";
import RegionFiltering from "./Components/regionFiltering";

type FilteredData = {
  namesOfCountries: string[];
  countriesRegion: string[];
  countryBorders: string[];
};

const filteredData: FilteredData = {
  namesOfCountries: [],
  countriesRegion: [],
  countryBorders: [],
};

let allCountries: any;

//TODO: add next theme

export default function Home() {
  const [data, setData] = useState([]);
  const [region, setRegion] = useState("");
  const [search, setSearch] = useState("");
  const regions = new Set(filteredData.countriesRegion);

  const handleClick = (event: any) => {
    setRegion(event.target.innerHTML);
  };

  useEffect(() => {
    //Fetching data
    const apiCall = async () => {
      //TODO: this has to work by region filter and name search filter by using conditions fetch

      const data = await axios("/data.json");

      setData(data.data);
    };
    apiCall();
  }, []);

  data.forEach((country: any) => {
    filteredData.namesOfCountries.push(country.name);
    filteredData.countriesRegion.push(country.region);
    filteredData.countryBorders.push(country.borders);
  });

  function handleOnchange(value: string) {
    setSearch(value.toLowerCase());
  }

  if (region === "" && search === "") {
    allCountries = data
      .sort(() => Math.random() - 0.5)
      .map((country: any) => {
        return (
          <Link key={country.name} href={`Name/${country.name}`}>
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
  } else if (region !== "" || search !== "") {
    allCountries = data.map((country: any) => {
      const countryName: string = country.name.toLowerCase();
      if (country.region === region) {
        return (
          <Link key={country.name} href={`Name/${country.name}`}>
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
      } else if (countryName.includes(search)) {
        return (
          <Link key={countryName} href={`Name/${country.name}`}>
            <RestCountries
              countryName={countryName}
              src={country.flag}
              alt={`${country.name} image`}
              population={country.population}
              region={country.region}
              capital={country?.capital}
            />
          </Link>
        );
      }
    });
  }

  const countryLoading = <CountriesLoading />;

  return (
    <>
      <div className="container mt-[80px] mx-auto flex flex-col gap-8 items-center">
        <div className="w-full flex flex-col items-start py-5 px-3 md:px-0 gap-2 md:flex-row md:justify-between  md:items-center bg-transparent">
          <Filter handleOnchange={handleOnchange} />
          <RegionFiltering handleClick={handleClick} regions={regions} />
        </div>

        <Suspense fallback={<CountriesLoading />}>
          <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {allCountries}
          </div>
        </Suspense>
      </div>
    </>
  );
}
